function array2D(n) {
  arr = new Array(n);
  for (var i=0; i < n; i++) { 
    arr[i] = new Array(n); 
    for (var j=0; j < n; j++) { arr[i][j] = 0.0; }
  }
  return arr;
} 

var N = 200;
var k = 0.02;
var h = 0.5;
var alpha_ = -1.4;
var beta = 0.7;
var re_now = array2D(N);
var im_now = array2D(N);
var re_future = array2D(N);
var im_future = array2D(N);
var pseudo_3d = false;
var alt = false;
var alt2 = false;

function calc() {
  var re_laplace, im_laplace;
  for (var x=1; x < N-1; x++) { 
    for (var y=1; y < N-1; y++) { 
      /* Laplace Operator am Ort (x,y) auf Real- und Imaginärteil anwenden */
      re_laplace = (
        re_now[x-1][y] +
        re_now[x+1][y] +
        re_now[x][y-1] +
        re_now[x][y+1] -
        4.0*re_now[x][y])/h/h;
        
      im_laplace = (
        im_now[x-1][y] +
        im_now[x+1][y] +
        im_now[x][y-1] +
        im_now[x][y+1] -
        4.0*im_now[x][y])/h/h;
 
      if(pseudo_3d && y*h>=1) {
        re_laplace+= (re_now[x][y]-re_now[x][y-1])/(h*h*y);
        im_laplace+= (im_now[x][y]-im_now[x][y-1])/(h*h*y);
      }
 
      /* Euler-forward-Schritt für die CGLE berechnen */        
      var abs2 = re_now[x][y]*re_now[x][y] + im_now[x][y]*im_now[x][y];
      
      re_future[x][y] = 
        (1.0+k)*re_now[x][y] + 
        k*abs2*(beta*im_now[x][y]-re_now[x][y]) +
        k*(re_laplace-alpha_*im_laplace);
        
      im_future[x][y] = 
        (1.0+k)*im_now[x][y] -
        k*abs2*(beta*re_now[x][y]+im_now[x][y]) +
        k*(alpha_*re_laplace+im_laplace);    
    }
  }

  /* Neumann-Ränder berechnen */
  for (var x=0; x < N; x++) {
    re_future[x][0] =   re_future[x][1];
    re_future[x][N-1] = re_future[x][N-2];
    im_future[x][0] =   im_future[x][1];
    im_future[x][N-1] = im_future[x][N-2];
  } 
  for (var y=0; y < N; y++) { 
    re_future[0][y] =   re_future[1][y];
    re_future[N-1][y] = re_future[N-2][y];
    im_future[0][y] =   im_future[1][y];
    im_future[N-1][y] = im_future[N-2][y];
  }

  /* Puffer austauschen */
  var temp = re_now;
  re_now = re_future;
  re_future = temp;

  temp = im_now;
  im_now = im_future;
  im_future = temp;  
}

function setup()
{
   var canvas = createCanvas(N, N);
   canvas.parent('sketch-holder');
   frameRate(40);
   colorMode(HSB, 1.0);
   
   /* Real- und Imaginärteil mit Zufallswerten aus dem Intervall [-1,1] initialisieren */
   for (var x=0; x < N; x++) { 
     for (var y=0; y < N; y++) { 
       re_now[x][y] = 0.2*random(-1.0, 1.0);
       im_now[x][y] = 0.2*random(-1.0, 1.0);
     }
   }
}

/* TODO: alpha, beta Auswahl aus Stabilitätsdiagramm */
function draw() { 
  for (var i=0; i<10; i++) calc();
  
  for (var x=0; x<N; x++) { 
    for (var y=0; y<N; y++) { 
      set(x, y, color(220./360., 0.5*(re_now[x][y]+1.0), 1.0));
    }
  }
	if(pseudo_3d) { text("3d", 5, 15); }
  updatePixels();
  if(mouseIsPressed && mouseButton!=CENTER && !alt2) {
    var x0 = max(0, mouseX - 50);
    var y0 = max(0, mouseY - 50);
    var x1 = min(N, mouseX + 50);
    var y1 = min(N, mouseY + 50);
    var mult=1;
    if(alt) { mult=-1; }
    for (var x=x0; x < x1; x++) { 
      for (var y=y0; y < y1; y++) { 
        re_now[x][y] = 2*(float((x-x0))/(x1-x0) - 0.5)*mult;
        im_now[x][y] = 2*(float((y-y0))/(y1-y0) - 0.5);
      }
    }
  }
}  

/* Zusatzfunktion: Medium verschieben */
var locked = false;
var bdifx = 0;
var bdify = 0;

function mouseDragged() {
  if(locked && alt2) {
    var re_temp= array2D(N); 
    var im_temp= array2D(N);   
    for (var x = 0; x < N; x=x+1) { 
      for (var y = 0; y < N; y=y+1) { 
        var rel_x= x-mouseX+bdifx;
        var rel_y= y-mouseY+bdify;
        if(rel_x>=0 && rel_x<N && rel_y>=0 && rel_y<N) {
          re_temp[x][y]=re_now[rel_x][rel_y];
          im_temp[x][y]=im_now[rel_x][rel_y];
        } else {
          re_temp[x][y]=0;
          im_temp[x][y]=0;
        }
      }
    }
    re_now= re_temp;
    im_now= im_temp;
    bdifx = mouseX; 
    bdify = mouseY; 
  }
}

function mousePressed() {
  locked = true; 
  bdifx = mouseX; 
  bdify = mouseY; 
}

function mouseReleased() {
  locked = false;
}

function keyTyped() {
  if (key=='3')  { pseudo_3d= true; }
  if (key=='2')  { pseudo_3d= false; }
}

function keyPressed() {
   if (keyCode == SHIFT)  alt = true;
	 if (keyCode == ALT || keyCode == CONTROL)  alt2 = true;
}
 
function keyReleased() {
  if (keyCode == SHIFT)  alt = false;
	if (keyCode == ALT || keyCode == CONTROL)  alt2 = false;
}