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