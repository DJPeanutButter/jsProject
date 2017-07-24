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
      var e = window,
          a = 'inner';

      //check for IE because some people make poor decisions
      if (!('innerWidth' in window)){
          a = 'client';
          e = document.documentElement || document.body;
      }

      var p = document.body;
      var style = p.currentStyle || window.getComputedStyle(p);

      console.log(style.marginTop);
      console.log(style.marginLeft);
      console.log(style.marginRight);
      console.log(style.marginBottom);

      this.field.width  = wWindow = e[a+'Width'] - parseInt (style.marginLeft) - parseInt (style.marginRight);
      this.field.height = hWindow = e[a+'Height']- parseInt (style.marginTop)  - parseInt (style.marginBottom);
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
