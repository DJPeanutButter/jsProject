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
      BACKGROUND_IMAGE_URL = "";
      INTERVAL_DELAY    = 20;

/* Reference Variables *//*
 *
 * Same as above, using commas to avoid writing var for each variable.
 */
var wWindow,
    hWindow,
    mainLoopInt,
    scriptTest;
    
/* USED FOR DEMONSTRATION */
var myObject = CreatePhysicalObject (10,10,0,0,0.1,0,"red",{},{x:10},{x:10,y:10},{y:10},[]);

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
         * DOM way of changing the CSS background-color style for document.body using our
         * constant BACKGROUND_COLOR. Don't change the value here, if you want to change
         * the background color of the game, change it at the top of the file, that's what
         * those constants are there for.
         */
        document.body.style.backgroundColor = BACKGROUND_COLOR;
        // document.body.style.backgroundImage = 'url(BACKGROUND_IMAGE_URL)';
        
        /*
         * Stores the setInterval function in the mainLoopInt global variable. setInterval
         * let's us call a function at a specified interval indefinitely. This is how we're
         * going to have our main game loop execute. The prototype for setInterval is
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
        /*
         * Check for IE because some people make poor decisions.
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
         * This one does something similar. Looking at it now, I guess I could shorten it to 
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

/* This gives control to the game.resize method when the window is resized. */
document.body.onresize = function (){
  game.resize();
};

/* Function Declarations *//*
 *
 * This is where we define our mainLoop function, which takes one parameter - cvs.
 * All we're doing in the first line below is defining a variable, ctx, as the context
 * of the canvas, cvs. The context is the part of the canvas that has methods that 
 * facilitate graphics. It's the part of the canvas that we'll actually be drawing to.
 * The second line of the code below is just erasing everything on the context, leaving
 * it transparent so that the background of document.body is visible.
 */
function mainLoop(cvs){
    var ctx = cvs.getContext("2d");
    ctx.clearRect(0,0,wWindow,hWindow);
    
    myObject = myObject.getNextInstance ();
    myObject.draw (ctx);
}