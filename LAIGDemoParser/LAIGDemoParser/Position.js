function position(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;

    position.distance = function(position){
      return Math.sqrt((this.x-position.x)*(this.x-position.x)+(this.y-position.y)*(this.y-position.y)
        +(this.z-position.z)*(this.z-position.z));
    }

}
