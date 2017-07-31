function MovingObject (x,y,dX,dY,ddX,ddY,color,points,otherObjects){
  PhysicalObject.call (this,x,y,color,points,otherObjects);
  this.dX   = dX;
  this.dY   = dY;
  this.ddX  = ddX;
  this.ddY  = ddY;
  
  this.getNextInstance = function (){
    return new MovingObject(this.x+this.dX+this.ddX,
                            this.y+this.dY+this.ddY,
                            this.dX+this.ddX,
                            this.dY+this.ddY,
                            this.ddX,
                            this.ddY,
                            this.color,
                            this.points,
                            this.otherObjects);
  };
}

function createMovingObject (){
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
      console.warn ("MovingObject requires at least one Point object in parameter list");
      args[args.length] = {x:0,y:0};
      break;
    }
  
  /*
   * Feeds the primitive values passed as parameters into the
   * constructor for VisibleObject
   */
  return new MovingObject ((nPrim>nCur?args[nCur++]:0),             //x
                           (nPrim>nCur?args[nCur++]:0),             //y
                           (nPrim>nCur?args[nCur++]:0),             //dX
                           (nPrim>nCur?args[nCur++]:0),             //dY
                           (nPrim>nCur?args[nCur++]:0),             //ddX
                           (nPrim>nCur?args[nCur++]:0),             //ddY
                           (nPrim>nCur?args[nCur++]:0),             //color
                           args.splice(nPrim,args.length-nPrim-1),  //points
                           args[args.length-1]);                    //otherObjects
}