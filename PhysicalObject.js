function PhysicalObject (x,y,dX,dY,ddX,ddY,color,points,otherObjects){
  VisibleObject.call (this,x,y,dX,dY,ddX,ddY,color,points);
  this.otherObjects = otherObjects;
  
  this.getNextInstance = function(){
    return new PhysicalObject(this.x+this.dX+this.ddX,
                              this.y+this.dY+this.ddY,
                              this.dX+this.ddX,
                              this.dY+this.ddY,
                              this.ddX,
                              this.ddY,
                              this.color,
                              this.points,
                              this.otherObjects);
  };
  
  /* TODO: Create A Priori collision testing (lots of math) */
}

function createPhysicalObject(){
  /* Find the length of the argument list and break it apart into an array */
  var args = Array.from(arguments);
  var args = [...arguments];
  var nPrim,nCur=0;
  
  /*
   * Count number of primitive parameters, make sure there's at least
   * one object or add one if there is none.
   */
  for (nPrim=0;typeof args[nPrim]!='object';nPrim++)
    if (nPrim===args.length){
      console.warn ("VisibleObject requires at least one Point object in parameter list");
      args[args.length] = {x:0,y:0};
      break;
    }
  
  /*
   * Feeds the primitive values passed as parameters into the
   * constructor for VisibleObject
   */
  return new PhysicalObject((nPrim>nCur?args[nCur++]:0),
                            (nPrim>nCur?args[nCur++]:0),
                            (nPrim>nCur?args[nCur++]:0),
                            (nPrim>nCur?args[nCur++]:0),
                            (nPrim>nCur?args[nCur++]:0),
                            (nPrim>nCur?args[nCur++]:0),
                            (nPrim>nCur?args[nCur++]:0),
                            args.splice(nPrim,args.length-nPrim-1),
                            args[args.length-1]);
}

function isInsideTriangle (point, triangle){
  console.time ("isInsideTriangle");
  if (typeof point.x        === 'number' &&
      typeof point.y        === 'number' &&
      typeof triangle[0].x  === 'number' &&
      typeof triangle[0].y  === 'number' &&
      typeof triangle[1].x  === 'number' &&
      typeof triangle[1].y  === 'number' &&
      typeof triangle[2].x  === 'number' &&
      typeof triangle[2].y  === 'number'){
    /*
     * This is a technology as far as I'm concerned:  I have
     * no clue how/why, but it appears to work.
     *
     *   Reference:
     *     https://en.wikipedia.org/wiki/Barycentric_coordinate_system
     */
    var s = triangle[0].y * triangle[2].x
          - triangle[0].x * triangle[2].y
          +(triangle[2].y - triangle[0].y) * point.x
          +(triangle[0].x - triangle[2].x) * point.y;
    var t = triangle[0].x * triangle[1].y
          - triangle[0].y * triangle[1].x
          +(triangle[0].y - triangle[1].y) * point.x
          +(triangle[1].x - triangle[0].x) * point.y;
    
    if ((s<0)!==(t<0))
      return false;
    
    var A =-triangle[1].y * triangle[2].x
          + triangle[0].y *(triangle[2].x - triangle[1].x)
          + triangle[0].x *(triangle[1].y - triangle[2].y)
          + triangle[1].x * triangle[2].y;
    
    if (A < 0.0){
          s = -s;
          t = -t;
          A = -A;
    }
    return s > 0 && t > 0 && s + t <= A;
  }
  return false;
}
