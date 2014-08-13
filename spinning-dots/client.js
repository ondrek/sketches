(function(){


    "use strict";


    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ){ window.setTimeout(callback, 1000 / 60); };
    })();


    /*
     *
     */
    var allContexts = [];
    var canvasElement = document.getElementById("b");
    var context = canvasElement.getContext("2d");


    /*
     *
     */
    var ContextLayer = function(options){

        // create an reference for setInterval
        allContexts.push(this);

        // set options with speed, canvas reference and more
        this.options = options;

    };


    /*
     *
     */
    ContextLayer.prototype.iterationForAngle = 0;


    /*
     *
     */
    ContextLayer.prototype.iterationForBouncing = 0;


    /*
     *
     */
    ContextLayer.prototype.drawRotatedCanvas = function(){

        context.save();

        var halfOfCanvasWidth = context.canvas.width / 2;
        var halfOfCanvasHeight = context.canvas.height / 2;
        var newAngle = this.iterationForAngle * 0.0005;

        context.translate(halfOfCanvasWidth, halfOfCanvasHeight);
        context.rotate(newAngle);
        context.translate(-halfOfCanvasWidth, -halfOfCanvasHeight);

        var howManyCircles =this.options.number;
        var radiusOfCircle = this.options.radius;

        this.createAnCircumference(radiusOfCircle, howManyCircles);

        context.restore();

    };


    /*
     *
     */
    ContextLayer.prototype.createAnCircumference = function(radius, circles){

        var centerX = context.canvas.width/2;
        var centerY = context.canvas.height/2;

        var alpha = ((2 * Math.PI) / circles);

        var radFactor = Math.PI * ( Math.abs( 60 - this.iterationForBouncing % 120 ) / 60 );
        var actualRadius = radius * ( (1 + 0.1 * Math.sin(radFactor) ) );
        for (var i=1; i<=circles; i++){
            var smallCircleX = centerX + ( actualRadius * Math.cos(alpha*i) );
            var smallCircleY = centerY + ( actualRadius * Math.sin(alpha*i) );
            this.drawSimpleCircle(smallCircleX, smallCircleY, 5);
        }

    };


    /*
     *
     */
    ContextLayer.prototype.drawSimpleCircle = function(posX, posY, radius){

        context.beginPath();
        context.arc(posX, posY, radius, 0, 2*Math.PI, false);
        context.closePath();
        context.strokeStyle="white";
        context.fillStyle = "white";
        context.fill();
        context.stroke();

    };


    /*
     *
     */
    for (var dotsRound=0; dotsRound<=8; ++dotsRound){

        var speedOf = dotsRound * 4;
        var numberOf = 45 - (dotsRound * 5);
        var radiusOf = 160 - (18 * dotsRound);

        new ContextLayer({
            speed : speedOf,
            number : numberOf,
            radius : radiusOf
        });

    }


    /*
     *
     */
    var animationRenderer = function(){

        // clear canvas context
        context.clearRect(
            0,
            0,
            context.canvas.width,
            context.canvas.height
        );

        // loop for all layers
        for (var i=0, howManyLayers=allContexts.length; i<howManyLayers; ++i){
            var layer = allContexts[i];
            layer.iterationForBouncing++;
            layer.iterationForAngle += layer.options.speed;
            layer.drawRotatedCanvas();
        }

    };


    // setInterval(animationRenderer, 5);


    /*
     *
     */
    (function animationLoop(){
        requestAnimFrame(animationLoop);
        animationRenderer();
    })();


})();


