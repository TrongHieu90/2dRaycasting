class Particle
{
  constructor()
  {
    this.pos = createVector(width/2, height/2);
    this.rays = [];

    //for all the angles in 360 degree rotation
    for(let i = 0; i < 360; i +=10)
    {
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  update(x, y)
  {
    this.pos.set(x, y);
  }

  look(wall)
  {
    for(let ray of this.rays)
    {
      const pt = ray.cast(wall);
      if(pt)
      {
        line(this.pos.x, this.pos.y, pt.x, pt.y);
      }
    }
  }

  show()
  {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
    for(let ray of this.rays)
    {
      ray.show();
    }
  }
}
