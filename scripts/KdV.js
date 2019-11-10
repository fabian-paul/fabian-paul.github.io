var N = 400;
var h = 0.1;
var k = 0.0003;
var H = 150;
var alt = false;
var alt2 = false;

var u = new Array(N);
var u_new = new Array(N);
var u_old = new Array(N);

function add_soliton(alpha_, c_, clear) {
   sqrt_alpha = sqrt(alpha_);
   for (var i=0; i<N; i++) {
        var x = i*h;
        var t_new = k;
        var t = 0.0;
        var u_i = alpha_ / (2.0 * Math.pow(Math.cosh(0.5*sqrt_alpha*(x-alpha_*t-c_)), 2));
        var u_new_i = alpha_ / (2.0 * Math.pow(Math.cosh(0.5*sqrt_alpha*(x-alpha_*t_new-c_)), 2));
        if (clear || u_i > 0.01) {
          u[i] = u_i;
          u_new[i] = u_new_i;
        } 
   }
}

function setup() {
   var canvas = createCanvas(N, H);
   canvas.parent('sketch-holder');
   strokeWeight(3);
   colorMode(RGB);
   stroke(15,75,85);
   add_soliton(1.0, 0.5*h*N, true);
}

function step_() {
   // cycle buffers
   var buffer = u_old;
   u_old = u;
   u = u_new;
   u_new = buffer;
   // time step
   for(var m=0; m<N; m++) {
     m_plus_2 = (m + 2) % N  ;
     m_plus_1 = (m + 1) % N;
     m_minus_2 = (m + N - 2) % N;
     m_minus_1 = (m + N - 1) % N;
     u_new[m] = u_old[m] - k/(h*h*h) * (u[m_plus_2] - 2*u[m_plus_1] + 2*u[m_minus_1] - u[m_minus_2]) -
                6*k/(3*h) * (u[m_plus_1] + u[m] + u[m_minus_1]) * (u[m_plus_1] - u[m_minus_1]);
   }
}

function draw() {
   // render to screen
   clear();
   for (var i=0; i<600; i++) { step_(); }
   for (var m=0; m<N-1; m++) {
     line(m, H-2-(H-3)*2*u[m], m+1, H-2-(H-3)*2*u[m+1]);
   }
}

function mouseReleased() {
  alpha_ = float(H-mouseY) / float(H);
  c_ = mouseX * h;
  add_soliton(alpha_, c_, alt);
}

function keyPressed() {
   if (keyCode == SHIFT) alt = true;
   if (keyCode == ALT || keyCode == CONTROL)  alt2 = true;
}
 
function keyReleased() {
   if (keyCode == SHIFT) alt = false;
   if (keyCode == ALT || keyCode == CONTROL)  alt2 = false;
}
