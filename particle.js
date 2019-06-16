class Particle
{
  constructor()
  {
    this.pos = createVector(width/2, height/2);
    this.rays = [];
    this.offset = 0;
    this.heading = 0;

    //for all the angles in 360 degree rotation
    for(let i = 0; i < 90; i +=2)
    {
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  rotate(angle)
  {
    this.heading += angle;

    for(let i = 0; i < this.rays.length; i +=1)
    {
      this.rays[i].setAngle(radians(i) + this.heading);
    }
  }

  update(x, y)
  {
    this.pos.set(x, y);
  }

  look(walls)
  {
    const scene = [];
    for(let i = 0; i < this.rays.length; i++)
    {

      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for(let wall of walls)
      {
        const pt = ray.cast(wall);
        if(pt)
        {
          const d = p5.Vector.dist(this.pos, pt);
          if(d<record)
          {
            record = d;
            closest = pt;
          }
        }
      }
      if(closest)
      {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);

      }
      scene[i] = record;

      // else
      // {
      //   {
      //     scene[i] = Infinity;
      //   }
      // }
    }
    return scene;
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
