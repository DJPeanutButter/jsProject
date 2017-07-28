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
const BACKGROUND_COLOR  = "#383838",
      BACKGROUND_IMAGE_URL = "";
      INTERVAL_DELAY    = 20;

/* Reference Variables */
var wWindow,
    hWindow,
    mainLoopInt,
    leftArrowDown,
    leftArrowUp,
    upArrowDown,
    upArrowUp,
    rightArrowDown,
    rightArrowUp,
    downArrowDown,
    downArrowUp;

/* TESTING isInsideTriangle function */
var voTriangle  = createPhysicalObject (10,10,0,0,0,0,"red",{},{x:60,y:13},{x:27,y:113},[]);
var voPoint     = createPhysicalObject (300,200,0,0,0,0,"#c8c8c8",{},{x:5},{x:5,y:5},{y:5},[]);

/* Object Variables */
    game = {
      field:  document.createElement("canvas"),
      load:   function(){
        document.body.appendChild (this.field);
        
        /* Leaving options for ourselves */
        document.body.style.backgroundColor = BACKGROUND_COLOR;
        // document.body.style.backgroundImage = 'url(BACKGROUND_IMAGE_URL)';
        
        mainLoopInt = setInterval (function(){
          mainLoop(game.field);
        },INTERVAL_DELAY);
      },
      resize: function(){
        /* Check for IE because some people make poor decisions. */
        var container = window,
            prefix    = 'inner',
            style = document.body.currentStyle || window.getComputedStyle(document.body);
            
        if (!('innerWidth' in window)){
            prefix    = 'client';
            container = document.documentElement || document.body;
        }
        
        this.field.width  = wWindow = container[prefix+'Width'] - parseInt (style.marginLeft) - parseInt (style.marginRight);
        this.field.height = hWindow = container[prefix+'Height']- parseInt (style.marginTop)  - parseInt (style.marginBottom);
      }
    };

/* Function Assignments */
window.onload = function (){
  game.resize();
  game.load();
};

window.onkeydown = function (e){
    var key = e.keyCode?e.keyCode:e.which;
    
    if (key === 37 && leftArrowUp)
      leftArrowDown = !(leftArrowUp = false);
    else if (key === 39 && rightArrowUp)
      rightArrowDown = !(rightArrowUp = false);
    
    if (key === 38 && upArrowUp)
      upArrowDown = !(upArrowUp=false);
    else if (key === 40 && downArrowUp)
      downArrowDown = !(downArrowUp=false);  
}

window.onkeyup = function (e){
    var key = e.keyCode?e.keyCode:e.which;
    
    if (key === 37)
      leftArrowDown = !(leftArrowUp = true);
    else if (key === 39)
      rightArrowDown = !(rightArrowUp = true);
    
    if (key === 38)
      upArrowDown = !(upArrowUp = true);
    else if (key === 40)
      downArrowDown = !(downArrowUp = true);
}

/* This gives control to the game.resize method when the window is resized. */
document.body.onresize = function (){
  game.resize();
};

/* Function Declarations */
function mainLoop(canvas){
  console.time ("mainLoop");
  var context = canvas.getContext("2d");
  context.clearRect(0,0,wWindow,hWindow);
  
  /* TESTING isInsideTriangle function */
  voPoint = voPoint.getNextInstance ();
  voTriangle = voTriangle.getNextInstance ();
  
  voTriangle.draw (context);
  voPoint.draw    (context);
  
  if (isInsideTriangle ({
      x: voPoint.x + voPoint.points[0].x,
      y: voPoint.y + voPoint.points[0].y
    }, [{
      x: voTriangle.x + voTriangle.points[0].x,
      y: voTriangle.y + voTriangle.points[0].y,
    }, {
      x: voTriangle.x + voTriangle.points[1].x,
      y: voTriangle.y + voTriangle.points[1].y,
    }, {
      x: voTriangle.x + voTriangle.points[2].x,
      y: voTriangle.y + voTriangle.points[2].y,
    }]) || isInsideTriangle ({
      x: voPoint.x + voPoint.points[1].x,
      y: voPoint.y + voPoint.points[1].y
    }, [{
      x: voTriangle.x + voTriangle.points[0].x,
      y: voTriangle.y + voTriangle.points[0].y,
    }, {
      x: voTriangle.x + voTriangle.points[1].x,
      y: voTriangle.y + voTriangle.points[1].y,
    }, {
      x: voTriangle.x + voTriangle.points[2].x,
      y: voTriangle.y + voTriangle.points[2].y,
    }]) || isInsideTriangle ({
      x: voPoint.x + voPoint.points[2].x,
      y: voPoint.y + voPoint.points[2].y
    }, [{
      x: voTriangle.x + voTriangle.points[0].x,
      y: voTriangle.y + voTriangle.points[0].y,
    }, {
      x: voTriangle.x + voTriangle.points[1].x,
      y: voTriangle.y + voTriangle.points[1].y,
    }, {
      x: voTriangle.x + voTriangle.points[2].x,
      y: voTriangle.y + voTriangle.points[2].y,
    }]) || isInsideTriangle ({
      x: voPoint.x + voPoint.points[3].x,
      y: voPoint.y + voPoint.points[3].y
    }, [{
      x: voTriangle.x + voTriangle.points[0].x,
      y: voTriangle.y + voTriangle.points[0].y,
    }, {
      x: voTriangle.x + voTriangle.points[1].x,
      y: voTriangle.y + voTriangle.points[1].y,
    }, {
      x: voTriangle.x + voTriangle.points[2].x,
      y: voTriangle.y + voTriangle.points[2].y,
    }]))
    voTriangle.color = "blue";
  else
    voTriangle.color = "red";
  
  if (leftArrowDown && !rightArrowDown)
    voPoint.dX = Math.max (voPoint.dX-0.1,-5);
  else if (rightArrowDown && !leftArrowDown)
    voPoint.dX = Math.min (voPoint.dX+0.1,5);
  else if (voPoint.dX !== 0)
    voPoint.dX += voPoint.dX>0?-0.01:0.01;
  
  if (upArrowDown && !downArrowDown)
    voPoint.dY = Math.max (voPoint.dY-0.1,-5);
  else if (downArrowDown && !upArrowDown)
    voPoint.dY = Math.min (voPoint.dY+0.1,5);
  else if (voPoint.dY !== 0)
    voPoint.dY += voPoint.dY>0?-0.01:0.01;
  
  voPoint.x %= wWindow;
  voPoint.y %= hWindow;
  console.timeEnd ("mainLoop");
}
