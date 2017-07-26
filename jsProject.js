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

/* Constants *//*
 *
 * Using commas here, this is exactly the same as
 *
 *   const BACKGROUND_COLOR = "#FFFF00";
 *   const INBTERVAL_DELAY  = 20;
 */
const BACKGROUND_COLOR  = "#FFFF00",
      INTERVAL_DELAY    = 20;

/* Reference Variables *//*
 *
 * Same as above, using commas to avoid writing var for each variable.
 */
var wWindow,
    hWindow,
    mainLoopInt;  //Can't forget the ; on the last one!

/* Object Variables */

    /*
     * The 'game' object is probably the most confusing thing about this
     * document right now. The reason I find it confusing is because nothing
     * LOOKS like it's being initialized. As it turns out, in JavaScript, {...}
     * is a literal for an object. Not only does it make initialization easier,
     * not to mention using literals will make the whole program run faster, but
     * the {...} literal notation will prove to be useful later in using objects
     * as return values from functions. But before we get ahead of ourselves,
     * let's examine a general case for object literals.
     *
     *   var someObject = {x:5, y:7};
     *
     * This creates an object - someObject - and initializes two properties, x
     * and y, and initializes them to 5 and 7 respectively. The exact same object
     * could be created with the following code.
     *
     *   var someObject = new Object;
     *   someObject.x = 5;
     *   someObject.y = 7;
     *
     * I'm going with the first way in this project because I thought it looked
     * better when I settled on the style guidelines. Moving along, I'm going to
     * break down the individual parts of the initializer in-line.
     */
    game = {
      /*
       * document.createElement ("TAG") is a function that creates an HTML element
       * and allows you to store it in a variable, i.e. game.field. In this case
       * we're creating a <canvas> element, which allows us to algorithmically draw
       * .png images to the page.
       */
      field:  document.createElement("canvas"),
      /*
       *   function(){...}
       *
       * is a function literal. You use this when you want to create a function in-line
       * to assign to a variable. This is one of my personal favorite aspects of JavaScript
       * because it removes the need for function pointers, which can get confusing as shit.
       *
       * So what
       *
       *   load: function(){...}
       *
       * does is assign the code inside the function literal to load making it a method of
       * game. This way we can call game.load() and have the code inside executed.
       */
      load:   function(){
        /*
         * The method appendChild(obj) appends obj to the end of whatever DOM element it
         * is called by, in this case it's adding field, our canvas, to document.body,
         * the <body> tag of the HTML document. We have to use the 'this' pointer to call
         * field because it is a property of the object literal that we are currently working
         * in. If we left out the 'this' pointer, we would be creating a new variable inside
         * this function literal (assuming we don't have a global 'field' variable) and
         * appending that to document.body - which would be pointless.
         *
         * At this point I'd like to mention that we COULD use appendChild to add an element
         * that hasn't been stored as a variable, but we should only do this for elements that
         * we aren't going to want to manipulate later, such as a line break.
         *
         *   document.body.appendChild (document.createElement("br"));
         *
         * You will probably see things like this later used for formatting, and it's perfectly
         * fine as long as we know that it is essentially static at that point.
         */
        document.body.appendChild (this.field);
        
        /*
         * DOM way of changing the CSS background-color style for game.field and document.body
         * using our constant BACKGROUND_COLOR. Don't change the value here, if you want to
         * change the background color of the game, change it at the top of the file, that's
         * what those constants are there for.
         */
        this.field.style.backgroundColor = document.body.style.backgroundColor = BACKGROUND_COLOR;
        
        /* Stores the setInterval function in the mainLoopInt global variable. setInterval
         * let's call a function at a specified interval indefinitely. This is how we're going
         * to have our main game loop execute. The prototype for setInterval is
         *
         *   setInterval(functionName,timeInMiliseconds)
         *
         * We have to use a function(){...} literal for the first parameter since we need to
         * send a parameter to the function we're calling. The reason we're assigning the
         * setInterval to mainLoopInt is so we can see if the game is running at any point
         * in our program. This is an elegant way to control resetting the game after a loss
         * or quit or wherever we want to allow the user to reset the playing field.
         *
         * Don't change INTERVAL_DELAY here, change it at the top.
         */
        mainLoopInt = setInterval (function(){
          mainLoop(game.field);
        },INTERVAL_DELAY);
      },
      resize: function(){
        /* check for IE because some people make poor decisions.
         *
         * I really like this part. It was in a few different pieces that I found in different
         * places. The first bit, which gives the size of the view port from the browser, looked
         * like this
         *
         *   var e = window;
         *   var a = 'inner';
         *   if (!('innerWidth' in window)){
         *     a = 'client';
         *     e = document.documentElement || document.body;
         *   }
         *   width  = e[a+'Width'];
         *   height = e[a+'Height'];
         * 
         * This checks to see if window.innerWidth is an existing object, which it will be in ANY
         * browser other than IE (take a fucking *hint*), and if it's missing, it makes adjustments
         * to cater to IE's unique way of doing things. The e=document.documentElement || document.body
         * sets e to whichever is present in the browser (the || is the logical or operator, and only 1
         * of those should exist, so e will be set to the one that DOES exist).If innerWidth is a member
         * of window, then we determine you're using a proper browser and go ahead and run window.innerWidth
         * and window.innerHeight like I should've been able to do from the beginning. I'm honestly about
         * 50/50 on taking support for IE out.
         *
         * The second bit, which gives us the size of the margins looked like this
         *
         *   var p     = document.body;
         *   var style = p.currentStyle || window.getComputedStyle(p);
         *
         * This one does the something similar. Looking at it now, I guess I could shorten it to 
         *
         *   var style = document.body.currentStyle || window.getComputedStyle(document.body);
         *
         * so I'll add that in with this branch, and probably commit it to the main branch soon.
         * Unless I forget. Anyway, it just returns whichever exists between document.body.currentStyle
         * - which is the IE way - and window.getComputedStyle(document.body) - which is the grown-up
         * way.
         *
         * All I did was combine the two (so that we get the size of the view port less the margins) and
         * change the variable names from single characters to descriptive names to fit the style guidelines.
         */
        var container = window,
            prefix    = 'inner',
            style = document.body.currentStyle || window.getComputedStyle(document.body);
            
        if (!('innerWidth' in window)){
            prefix    = 'client';
            container = document.documentElement || document.body;
        }
        /*
         * We're setting wWindow and hWindow as one-way variables, as in they will tell us the size of the
         * playing area but we cannot change the size of the playing area by changing these values.
         */
        this.field.width  = wWindow = container[prefix+'Width'] - parseInt (style.marginLeft) - parseInt (style.marginRight);
        this.field.height = hWindow = container[prefix+'Height']- parseInt (style.marginTop)  - parseInt (style.marginBottom);
      }
    };

/* Function Assignments *//*
 *
 * Ok, so this is how we get control of the browser in JavaScript. We use events. In
 * this case, we're using the event of the window loading. The window.onload() method
 * is called when the window finishes loading. So we're taking control of the browser
 * and starting an indefinite loop (using the setInterval method inside the game.load
 * method) during which we continuously manipulate the canvas game.field.
 */
window.onload   = function (){
  game.resize();
  game.load();
};

/* This gives control to the game.resize method. */
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
