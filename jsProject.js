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
      BACKGROUND_IMAGE_URL = "";
      INTERVAL_DELAY    = 20;

/* Reference Variables */
var wWindow,
    hWindow,
    mainLoopInt;
    
var myObject = createPhysicalObject (10,10,0,0,0,0.5,"red",{},{x:10},{x:10,y:10},{y:10},[]);

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
window.onload   = function (){
  game.resize();
  game.load();
};

/* This gives control to the game.resize method when the window is resized. */
document.body.onresize = function (){
  game.resize();
};

/* Function Declarations */
function mainLoop(canvas){
    var context = canvas.getContext("2d");
    context.clearRect(0,0,wWindow,hWindow);
    
    myObject = myObject.getNextInstance ();
    myObject.draw (context);
}