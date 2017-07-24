/*
 * jsProject.js 7/24/2017 Jonny Lawless
 *
 * Copyright (c) 2017 Lawless Software. All Rights Reserved.
 */

/*
 * Constants
 * Reference Variables
 * Object Variables
 * Function Assignments
 * Function Declarations
 */

//Constants
const BACKGROUND_COLOR  = "#FFFF00",
      INTERVAL_DELAY    = 20;

//Reference Variables
var wWindow,
    hWindow,
    mainLoopInt,

//Object Variables
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

      //check for IE because some people make poor decisions
      if (!('innerWidth' in window)){
          container = 'client';
          prefix    = document.documentElement || document.body;
      }

      var tag   = document.body,
          style = tag.currentStyle || window.getComputedStyle(tag);

      this.field.width  = wWindow = container[prefix+'Width'] - parseInt (style.marginLeft) - parseInt (style.marginRight);
      this.field.height = hWindow = container[prefix+'Height']- parseInt (style.marginTop)  - parseInt (style.marginBottom);
    }
  }

//Function Assignments
window.onload   = function (){
  game.resize();
  game.load();
};

document.body.onresize = function (){
  game.resize();
};

//Function Declarations
function mainLoop(cvs){
    var ctx = cvs.getContext("2d");
    ctx.clearRect(0,0,cvs.width,cvs.height);
}
