let canvas;
let number = 12;
let lineThickness = 6;
 let agents = new Array(number);



function setup() {
    mbsFramework();
    credits();
    for (let i = 0; i < agents.length; i++) 
    agents[i] = new Agent();
   
}
   
function draw() {
    // clear()

    background(255);

    let voronoi = new c2.Voronoi();
    voronoi.compute(agents)
    // let triangles = voronoi.triangles;
    // let vertices = voronoi.vertices;
    let edges = voronoi.edges;
    let regions = voronoi.regions;


    let rectangle = new c2.Rect(0, 0, width, height);

    let maxArea = 1;
    let minArea = Number.POSITIVE_INFINITY;
    for (let i = 0; i < regions.length; i++) {
        let clip = rectangle.clip(regions[i]);
        if(clip != null) regions[i] = clip;

        let area = regions[i].area();
        if(area < minArea) minArea = area;
        if(area > maxArea) maxArea = area;
    }

    stroke(0);
    strokeWeight(lineThickness);
    for (let i = 0; i < regions.length; i++) {
        let t = norm(regions[i].area(), minArea, maxArea);

        // let c = color( 30 + 10* t, 20+10*t,255 * t, 255);
         fill(255);
        drawPolygon(regions[i].vertices);
    }
 
    for (let i = 0; i < agents.length; i++) {
        agents[i].display();
        agents[i].update();
    }
  
}

function drawPolygon(vertices) {
    beginShape();
    for (let v of vertices) vertex(v.x, v.y);

    endShape(CLOSE);


}




  class Agent extends c2.Point {
    constructor() {
        let x = random(width);
        let y = random(height);
        super(x, y);

        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) {
            this.x = 0;
            this.vx *= -1;
        } else if (this.x > width) {
            this.x = width;
            this.vx *= -1;
        }
        if (this.y < 0) {
            this.y = 0;
            this.vy *= -1;
        } else if (this.y > height) {
            this.y = height;
            this.vy *= -1;
        }
    }

     display() {
    // stroke('#333333');
    // strokeWeight(20);
    // point(this.x, this.y);
     }
}


function keyPressed() {
    let m = month();
    let d = day();
    let y = year();
    let t = hour() + ':' + minute();
    if (key == 'S' || key == 's') 
      saveCanvas(canvas, 'canvas' + m + d + y + t , 'png');
  }
    
      
  
  function windowResized() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 900) {
      resizeCanvas(windowWidth * 0.85, windowWidth* 0.85);
      canvas.style("margin", "auto");
      canvas.style("margin-top", "10%");
    } else {
        resizeCanvas(windowWidth, windowWidth);
    }
  }
  
  function mbsFramework() {
    //template for canvas while printing and exporting/exhition on web/minimal
    canvas = createCanvas(1024, 1024); // will export as 512x512
    canvas.style("margin", "auto");
    canvas.style("margin-top", "5%");
    canvas.style("display", "flex");
    canvas.style("justify-content", "center");
    canvas.style("align-items", "center");
    canvas.style("border-radius", "10px");
    canvas.style("position", "relative");
    canvas.style("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)");
    canvas.style("zoom", "0.5");
    canvas.style('dpi', '300');
    canvas.style('bleed', '1/8');
    noCursor();
  }
  
  function credits() {
  //credits
    createP("Voronoi Diagram 01");
    createP("2D Voronoi cells with 12 bubles simulation." );
    createP("Press 's' to save a png image");
    var link =createA("https://marlonbarrios.github.io/", "Programmed by Marlon Barrios Solano");
  
    createElement('title', 'Voronoi Field 01')
  
    var allPs = selectAll("p")
    for (var i = 0; i < allPs.length; i++) {
      allPs[i].style("font-family", "Helvetica");
      allPs[i].style("justify-content", "center");
      allPs[i].style("align-items", "center");
      allPs[i].style("position", "relative");
      allPs[i].style("text-align", "center");
      allPs[i].style("display", "flex");
      allPs[i].style("font-size", "15px");
      allPs[i].style("color", "black");
      allPs[i].style("margin", "8px");
    }
  
    link.style("font-family", "Helvetica");
    link.style("justify-content", "center");
    link.style("align-items", "center");
    link.style("position", "relative");
    link.style("text-align", "center");
    link.style("display", "flex");
    link.style("font-size", "15px");
    link.style("color", "black");
    link.style("text-decoration", "none");
  
  }
  










     
