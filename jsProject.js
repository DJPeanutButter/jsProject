/*
 * jsProject.js 7/24/2017 Jonny Lawless
 *
 * Copyright (c) 2017 Lawless Software. All Rights Reserved.
 *
 * Constants
 * Reference Variables
 * Object Variables
 * Function Assignments
 * Function Declarations
 *
 * TODO:
 *  Code:
 *
 *  Documentation:
 */

/* Constants */
const BACKGROUND_COLOR  = "#FFFF00",
      INTERVAL_DELAY    = 20;

/* Reference Variables */
var wWindow,
    hWindow,
    mainLoopInt,
    temp;

/* Object Variables */
    game = {
    field:document.createElement("canvas"),
    load:function(){
        document.body.appendChild (this.field);

        this.field.style.backgroundColor = document.body.style.backgroundColor = BACKGROUND_COLOR;

        mainLoopInt = setInterval (function(){
          mainLoop(game.field);
        },INTERVAL_DELAY);
    },
    resize:function(){
      var container = window,
          prefix    = 'inner';

      /* check for IE because some people make poor decisions */
      if (!('innerWidth' in window)){
          prefix    = 'client';
          container = document.documentElement || document.body;
      }

      var tag   = document.body,
          style = tag.currentStyle || window.getComputedStyle(tag);

      this.field.width  = wWindow = container[prefix+'Width'] - parseInt (style.marginLeft) - parseInt (style.marginRight);
      this.field.height = hWindow = container[prefix+'Height']- parseInt (style.marginTop)  - parseInt (style.marginBottom);
    }
  }

/* Function Assignments */
window.onload   = function (){
  game.resize();
  game.load();
};

document.body.onresize = function (){
  game.resize();
};

/* Function Declarations */
function mainLoop(cvs){
    var ctx = cvs.getContext("2d");
    ctx.clearRect(0,0,cvs.width,cvs.height);
}

function VisibleObject (){
  /* Find the length of the argument list and break it apart into an array */
  var args = Array.from(arguments);
  var args = [...arguments];
  var nPrim,nCur=0;
  
  /* Check for 'new' keyword and sends a warning if it's missing */
  if (!(this instanceof VisibleObject)){
    console.warn ("Constructor for VisibleObject called as a function (did you forget 'new'?)");
    return new VisibleObject (...args);
  }
  
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
   * Check that all values of the points array have both an x and y property that is 
   * a number, and sets the property to 0 if it is not defined as a number.
   */
  for (var i=nPrim;i<args.length;i++){
    if (typeof args[nPrim].x !== 'number'){
      console.warn ("VisibleObject requires x values to be numbers for all Points");
      args[nPrim].x = 0;
    }
    if (typeof args[nPrim].y !== 'number'){
      console.warn ("VisibleObject requires y values to be numbers for all Points");
      args[nPrim].y = 0;
    }
  }
  
  /*
   * Uses the primitive values passed as parameters by copying
   * them from the args array to their respective properties.
   */
  this.x      = (nPrim>nCur?args[nCur++]:0);
  this.y      = (nPrim>nCur?args[nCur++]:0);
  this.dX     = (nPrim>nCur?args[nCur++]:0);
  this.dY     = (nPrim>nCur?args[nCur++]:0);
  this.ddX    = (nPrim>nCur?args[nCur++]:0);
  this.ddY    = (nPrim>nCur?args[nCur++]:0);
  this.color  = (nPrim>nCur?args[nCur++]:0);
  this.points = args.splice(nPrim,args.length-nPrim);
  
  /*
   * Draws a convex shape described by the points array 
   * to the Context (ctx) of a Canvas element
   */
  this.draw   = function(ctx){
      ctx.beginPath();
      ctx.moveTo(this.x+this.points[0].x,this.y+this.points[0].y);
      
      for (i=1;i<this.points.length;i++)
          ctx.lineTo(this.x+this.points[i].x,this.y+this.points[i].y);
      
      ctx.fillStyle = this.color;
      ctx.fill ();
  }
}
