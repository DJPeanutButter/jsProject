function PhysicalObject (x,y,dX,dY,ddX,ddY,color,points,otherObjects){
  VisualObjects.call (this,x,y,dX,dY,ddX,ddY,color,points);
  this.otherObjects = otherObjects;
}