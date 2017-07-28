function VisibleObject (x,y,dX,dY,ddX,ddY,color,points){
  this.x      = x;
  this.y      = y;
  this.dX     = dX;
  this.dY     = dY;
  this.ddX    = ddX;
  this.ddY    = ddY;
  this.color  = color;
  
  /*
   * Check that all values of the points array have both an x and y property that is 
   * a number, and sets the property to 0 if it is not defined as a number.
   */
  for (var i=0;i<points.length;i++){
    if (typeof points[i].x !== 'number'){
      console.warn ("VisibleObject requires x values to be numbers for all Points\n\tSetting points["+i+"].x to 0.");
      points[i].x = 0;
    }
    if (typeof points[i].y !== 'number'){
      console.warn ("VisibleObject requires x values to be numbers for all Points\n\tSetting points["+i+"].y to 0.");
      points[i].y = 0;
    }
  }
  this.points = points;
  
  /*
   * Draws a convex shape described by the points array 
   * to the Context of a Canvas element
   */
  this.draw   = function(context){
      context.beginPath();
      context.moveTo(this.x+this.points[0].x,this.y+this.points[0].y);
      
      for (i=1;i<this.points.length;i++)
          context.lineTo(this.x+this.points[i].x,this.y+this.points[i].y);
      
      context.fillStyle = this.color;
      context.fill ();
  }
}

function createVisibleObject(){
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
  return new VisibleObject ((nPrim>nCur?args[nCur++]:0),
                            (nPrim>nCur?args[nCur++]:0),
                            (nPrim>nCur?args[nCur++]:0),
                            (nPrim>nCur?args[nCur++]:0),
                            (nPrim>nCur?args[nCur++]:0),
                            (nPrim>nCur?args[nCur++]:0),
                            (nPrim>nCur?args[nCur++]:0),
                            args.splice(nPrim,args.length-nPrim));
}
