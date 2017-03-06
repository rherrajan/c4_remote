/*jslint browser:true, plusplus:true, vars: true */
"use strict";

function Sprite (options) {
                
    var that = {};
    var frameIndex = 0;
    var tickCount = 0;
    var ticksPerFrame = 0;
    var numberOfFrames = options.numberOfFrames || 1;
        
    that.x=0;
    that.y=0;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.loop = options.loop;

    that.render = function () {

        // console.log("frameIndex: ", frameIndex);

        // Draw the animation
        that.context.drawImage(
           that.image,
           frameIndex * that.width,
           0,
           that.width,
           that.height,
           that.x,
           that.y,
           that.width,
           that.height);
    };   

    that.update = function () {

        tickCount += 1;
            
        if (tickCount > ticksPerFrame) {
        
            tickCount = 0;
        
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {  
                // Go to the next frame
                frameIndex += 1;
            } else if (that.loop) {
                frameIndex = 0;
            }
        }
    };

    return that;


};

function Game() {
    var that = this;

    this.initOnceDone = false;

    var imgBackground;
    var imgForeground;
    var gilian;

    this.initOnce = function () {
        if (this.initOnceDone) {
            return false;
        }

        this.canvas = document.getElementsByTagName("canvas")[0];
        this.context = this.canvas.getContext('2d');

        console.log("size: ", this.canvas.width, this.canvas.height);
        this.initOnceDone = true;
    };

    this.init = function () {
        this.initOnce();
        this.clear();

        this.imgBackground = new Image();
        this.imgBackground.src = 'images/background.png';

        this.imgForeground = new Image();
        this.imgForeground.src = 'images/foreground.png';

        var imgGilian = new Image()
        imgGilian.src = 'images/Gilian.png';

        this.gilian = Sprite({
            context: this.context,
            width: 32,
            height: 48,
            image: imgGilian,
            numberOfFrames: 4,
            loop: true
        });

        that.gilian.x=100;
        that.gilian.y=100;


        console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

        that.joystick    = new VirtualJoystick({
            container   : document.getElementById('evadeCanvas'),
            mouseSupport: true,
            stationaryBase: true,
            baseX: 135,
            baseY: 465,
        });
        
        
/*
            setInterval(function(){
                var outputEl    = document.getElementById('result');
                outputEl.innerHTML  = '<b>Result:</b> '
                    + ' dx:'+joystick.deltaX()
                    + ' dy:'+joystick.deltaY()
                    + (joystick.right() ? ' right'  : '')
                    + (joystick.up()    ? ' up'     : '')
                    + (joystick.left()  ? ' left'   : '')
                    + (joystick.down()  ? ' down'   : '')   
            }, 1/30 * 1000);
*/

        setInterval(this.loop, 1000);

    };

    this.loop = function () {

        /*
        window.requestAnimationFrame(that.loop);
        that.paint();
        
        */

        that.clear();
        that.context.save();
        that.gameloop();
        that.paint();
        that.context.restore();

    }

    this.gameloop = function () {

        if(that.joystick.right()){
            that.gilian.x += 10;
        }
        if(that.joystick.left()){
            that.gilian.x -= 10;
        }
        if(that.joystick.up()){
            that.gilian.y -= 10;
        }
        if(that.joystick.down()){
            that.gilian.y += 10;
        }
    }

    this.paint = function () {
        that.context.drawImage(that.imgBackground, 45, 0);
        that.context.drawImage(that.imgForeground, 0, 0);

        //this.context.fillRect(150,500,10,10,"#fff"); // fill in the pixel at (10,10)
        this.drawCircle(140, 400, 50, "green", "white");

        that.gilian.update();
        that.gilian.render();

    };

    this.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };


    this.drawCircle = function (x, y, r, fill, stroke) {
        this.context.fillStyle = fill;
        this.context.strokeStyle = stroke;
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI, false);
        this.context.stroke();
        this.context.fill();
    };


    this.init();
}

console.log("hi ho");
this.game = new Game();

