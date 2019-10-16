/* Copyright 2012 Fabian Paul

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/

var dt = 0.1;       // time step
var m = 10;         // particle mass
var n = 50;         // particle count
var r = 7;          // particle radius
var k = 80;         // elastic spring constant for all (elastic) collisions
var barrier_height;  
var barrier_x0;     // left barrier edge
var barrier_x1;     // right barrier edge
var x0 = 0;         // instantaneous piston/floor position
var t = 0;          // time
var w = 2*Math.PI/(dt*100); // piston/floor angular frequency of oscillation
var amp = 10;       // piston/floor amplitude of oscillation
var Fg = -5;        // force of gravity
var R = 0.63;       // coefficient of restitution = 
                    // sqrt(ratio of inelastic to elastic force constant)
var symmetric = true;

var X = new Array(n); // positions, y-axis is pointing _up_
var V = new Array(n); // velocities
var Vtemp = new Array(n); 


function setup() {
  var canvas = createCanvas(400, 300);
  canvas.parent('sketch-holder'); // for web-page

  // init barrier 
  barrier_height = height/2;
  barrier_x0 = width/2 - 10; 
  barrier_x1 = width/2 + 10;  
  // position particles randomly 
  if(!symmetric) {
    for(i=0; i<n; i++) {
      X[i] = createVector(random(width), random(height), i);
      V[i] = createVector(0, 0);
    }
  } else {
      for(i=0; i<n/2; i++) {
        var x = random(width/2);
        var y = random(height);
        X[i] = createVector(x, y, i);
        V[i] = createVector(0,0);
        X[i + n/2] = createVector(width-x, y, i + n/2);
        V[i + n/2] = createVector(0, 0);        
    }
  }

  setup_gui();
}

function interact(a, b, v, w) {
  // make particles 'stick'
  // idea: set spring constant based on velocities
  // if particles are incoming (in the center of mass frame of reference) -> strong spring
  // if particles are outgoing -> weak spring
  // this 'steals' particles potential energy the moment they are at rest in the center of mass system
  var C;
  var x_rel = createVector((a.x-b.x)/2, (a.y-b.y)/2);
  var v_rel = createVector((v.x-w.x)/2, (v.y-w.y)/2);
  if(x_rel.dot(v_rel) > 0) { C = R*R; }
  else { C = 1; }

  // calculate soft core force
  var dX = createVector(b.x-a.x, b.y-a.y);
  var l = dX.mag();
  if(l<2*r) {
    var er = createVector(dX.x, dX.y);
    er.div(er.mag());
    er.mult(C*k*(2*r-l)); // C is the inelastic contibution
    return er;
  } else {
    return createVector(0,0);
  }
}

function wall(x) {
  // collisions are elastic
  var F = createVector(0,0);
  // reflecting half-planes at the sides 
  if(x.x < r) { F.add(createVector(k*(r-x.x),0)); }
  if(x.y < x0+r) { F.add(createVector(0,k*(x0+r-x.y))); }
  if(x.x > width-r) { F.add(createVector(k*(width-r-x.x),0)); }
  if(x.y > height-r) { F.add(createVector(0,k*(height-r-x.y))); }
  // barrier, this was a bit tricky
  if(x.y < barrier_height+r && x.x > barrier_x0-r && x.x < barrier_x1+r) {
    if( x.y-barrier_height > x.x-barrier_x1 && x.y-barrier_height > barrier_x0-x.x ) {
      F.add(createVector(0,k*(barrier_height+r-x.y))); }
    if( x.x > (barrier_x0+barrier_x1)/2 && x.x-barrier_x1 > x.y-barrier_height) { 
      F.add(createVector(k*(barrier_x1+r-x.x),0)); }
    if( x.x < (barrier_x0+barrier_x1)/2 && barrier_x0-x.x > x.y-barrier_height) {
      F.add(createVector(k*(barrier_x0-r-x.x),0)); }
  }
  return F;
}


function draw() {
  draw_gui();  
  // Euler step
  // update velocities
  // to make everthing independent form the particle ordering make a copy of V
  for(i=0; i<n; i++) { Vtemp[i] = V[i]; }
  for(i=0; i<n; i++) {
    var F = createVector(0,Fg); /* F_g */
    F.add(wall(X[i]));
    for(j=0; j<n; j++) {
      if(j!=i) {
        F.add(interact(X[j], X[i], V[j], V[i]));
      }
    }
    F.mult(dt/m);
    Vtemp[i].add(F);
  }
  // the part that was dependent from the ordering is over, copy Vtemp to V
  for(i=0; i<n; i++) { V[i] = Vtemp[i]; }
  // update positions
  for(i=0; i<n; i++) {
    var dX = createVector(V[i].x, V[i].y);
    dX.mult(dt);
    X[i].add(dX);
  }
  // update floor
  x0 = amp*(1+Math.sin(t*w));
  // draw everything
  background(255);
  for(i=0; i<n; i++) {
    ellipse(X[i].x, height-X[i].y, 2*r, 2*r);
  }
  // draw barrier
  line(barrier_x0, height-0, barrier_x0, height-barrier_height);
  line(barrier_x0, height-barrier_height, barrier_x1, height-barrier_height);
  line(barrier_x1, height-barrier_height, barrier_x1, height-0);
  // draw floor
  line(0, height-x0, width, height-x0);
  t += dt;
}

var slider_R;
var slider_amp;
var slider_r;
var label_R;
var label_amp;
var label_r;

function setup_gui() {  
  // create sliders
  slider_R = createSlider(0.0, 0.9999, R, 0.01);
  slider_R.position(20, 20);
  slider_R.hide();
  label_R = createSpan(R.toFixed(2)+' COR');
  label_R.position(160, 20);
  label_R.hide();
  
  slider_amp = createSlider(0.0, 30.0, amp, 0.01);
  slider_amp.position(20, 40);
  slider_amp.hide();
  label_amp = createSpan(amp.toFixed(1)+' amplitude');
  label_amp.position(160, 40);
  label_amp.hide();
  
  slider_r = createSlider(0.0, 15.0, r, 0.01);
  slider_r.position(20, 60);
  slider_r.hide();
  label_r = createSpan(r.toFixed(1)+' radius');
  label_r.position(160, 60);
  label_r.hide();
}

function draw_gui() {
  R = slider_R.value();
  label_R.html(R.toFixed(2)+' COR');
  amp = slider_amp.value();
  label_amp.html(amp.toFixed(1)+' amplitude');
  r = slider_r.value();
  label_r.html(r.toFixed(1)+' radius');
}

var visible = false;
var alt = false;

function mousePressed() {
  if(mouseButton == RIGHT || alt) {
    visible = ! visible;
    if(visible) {
      slider_R.show();
      slider_amp.show();
      slider_r.show();
      label_R.show();
      label_amp.show();
      label_r.show();
    } else {
      slider_R.hide();
      slider_amp.hide();
      slider_r.hide();
      label_R.hide();
      label_amp.hide();
      label_r.hide();
    }
  return false;
  }
}

function keyPressed() {
   if (keyCode == SHIFT)  alt = true;
}
 
function keyReleased() {
  if (keyCode == SHIFT)  alt = false;
}
