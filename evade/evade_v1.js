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

        console.log("frameIndex: ", frameIndex);

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
        this.canvas.addEventListener('click', function (e) {
            that.onclick(that.canvas, e);
        });
        this.context = this.canvas.getContext('2d');

        console.log("size: ", this.canvas.width, this.canvas.height);
        this.initOnceDone = true;
    };

    this.init = function () {
        this.initOnce();
        this.clear();

        this.imgBackground = new Image();
        this.imgBackground.src = 'img/background.png';

        this.imgForeground = new Image();
        this.imgForeground.src = 'img/foreground.png';

        var imgGilian = new Image()
        imgGilian.src = 'img/Gilian.png';

        this.gilian = Sprite({
            context: this.context,
            width: 32,
            height: 48,
            image: imgGilian,
            numberOfFrames: 4,
            loop: true
        });

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

        that.gilian.x=100;
        that.gilian.y=100;
    }

    this.paint = function () {
        that.context.drawImage(that.imgBackground, 45, 0);
        that.context.drawImage(that.imgForeground, 0, 0);

        that.gilian.update();
        that.gilian.render();

     /*     
             var width = 32,
            height = 48,
            frames = 4,
  
        currentFrame = 0,
        
        image = new Image()
        image.src = 'img/Gilian.png';
    
        that.context.drawImage(image, width * currentFrame, 0, width, height, 0, 0, width, height);
        
        if (currentFrame == frames) {
          currentFrame = 0;
        } else {
          currentFrame++;
        }
        


        var x=1;
        var y=1;
        that.drawCircle(75 * x + 100, 75 * y + 50, 25, "#ff9911", "black");
        console.log("draw: ", x, y);
        */
    };

    this.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

/*
    this.drawCircle = function (x, y, r, fill, stroke) {
        this.context.fillStyle = fill;
        this.context.strokeStyle = stroke;
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI, false);
        this.context.stroke();
        this.context.fill();
    };
*/
    this.onclick = function (canvas, e) {
        alert(" --- hi --- ");
    }


    this.init();
}

document.addEventListener('DOMContentLoaded', function () {
    this.game = new Game();
});
