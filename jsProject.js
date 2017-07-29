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
var poPolygon  = createPhysicalObject (10,10,0,0,0,0,"red",{},{x:60,y:13},{x:27,y:113},{x: 90,y: 99}, []);
var poPoint     = createPhysicalObject (300,200,0,0,0,0,"#c8c8c8",{},{x:5},{y:5},{x:5,y:5},[]);

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
  document.body.style.margin = "0px";
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
  var context = canvas.getContext("2d");
  context.clearRect(0,0,wWindow,hWindow);
  
  /* TESTING modulated hitTest */
  poPoint = poPoint.getNextInstance ();
  poPolygon = poPolygon.getNextInstance ();
  
  poPolygon.draw (context);
  poPoint.draw   (context);
  
  /* Collision Detection (In-Progress) */
  if (poPoint.hitTest (poPolygon))
    poPolygon.color = "blue";
  else
    poPolygon.color = "red";
  
  /* X-Axis Movement */
  if (leftArrowDown && !rightArrowDown)
    poPoint.dX = Math.max (poPoint.dX-0.1,-5);
  else if (rightArrowDown && !leftArrowDown)
    poPoint.dX = Math.min (poPoint.dX+0.1,5);
  /* Slow down if nothing is being pressed */
  else if (poPoint.dX !== 0)
    poPoint.dX += poPoint.dX>0?-0.01:0.01;
  
  /* Y-Axis Movement */
  if (upArrowDown && !downArrowDown)
    poPoint.dY = Math.max (poPoint.dY-0.1,-5);
  else if (downArrowDown && !upArrowDown)
    poPoint.dY = Math.min (poPoint.dY+0.1,5);
  /* Slow down if nothing is being pressed */
  else if (poPoint.dY !== 0)
    poPoint.dY += poPoint.dY>0?-0.01:0.01;
  
  /* I'm bouncing off the walls again (whoa-oh) */
  if (poPoint.x >= wWindow || poPoint.x <= 0)
    poPoint.dX *= -1;
  
  if (poPoint.y >= hWindow || poPoint.y <= 0)
    poPoint.dY *= -1;
}
