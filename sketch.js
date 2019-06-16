let b;
let walls = [];
let ray;
let particle;

const sceneW = 400;
const sceneH = 400;

let scene = [];

//var for perlin noise
let xoff = 0;
let yoff = 0;

function setup() {
  createCanvas(800, 400);
  for(let i = 0; i < 5; i++)
  {
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);

    walls[i] = new Boundary(x1, y1, x2, y2);
  };
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0 , sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));

  particle = new Particle();
}


function draw() {
  background(0);

  //keyboard control
  if(keyIsDown(LEFT_ARROW))
  {
    particle.rotate(0.1);
  }
  else if (keyIsDown(RIGHT_ARROW))
  {
      particle.rotate(-0.1);
  }

  //Render the boundary wall

  for(let wall of walls)
  {
    wall.show();
  }

  particle.show();
  //update particle with mouse pos
  particle.update(mouseX, mouseY);

  //using perlin noise in Particle
  // particle.update(noise(xoff) * width, noise(yoff) * height);

  // xoff += 0.01;
  // yoff =+ 0.01;

  const scene = particle.look(walls);

  const w = sceneW / scene.length;
  push();
  translate(sceneW, 0);

  for(let i = 0; i < scene.length; i++)
  {
    noStroke();
    const b = map(scene[i], 0, sceneW, 255, 0);
    const h = map(scene[i], 0, sceneW, sceneH, 0);
    fill(b);
    rectMode(CENTER);
    fill(scene[i]);
    rect(i * w + w /2, sceneH /2 , w, h);
  }

  pop();


  // ray.show();
  // ray.lookAt(mouseX, mouseY);
  //
  // let pt = ray.cast(wall);
  //
  // //console.log(pt);
  //
  // //filling the point on the wall
  // if(pt)
  // {
  //   fill(255);
  //   ellipse(pt.x, pt.y, 8, 8);
  // }

}
