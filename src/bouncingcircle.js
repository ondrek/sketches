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
    var canvasElement = document.getElementById("b");
    var context = canvasElement.getContext("2d");


    /*
     *
     */
    var ContextLayer = function(){};


    /*
     *
     */
    ContextLayer.prototype.iteratorNumber = 0;


    /*
     *
     */
    ContextLayer.prototype.currentRadius = 0;


    /*
     *
     */
    ContextLayer.prototype.countAlgorithm = function(){

        var radFactor = Math.PI * ( Math.abs( 60 - this.iteratorNumber % 120 ) / 60 );
        this.currentRadius = 50 * ( (1 + 4.5 * Math.sin(radFactor) ) );

    };


    /*
     *
     */
    ContextLayer.prototype.drawSimpleCircle = function(){

        var halfOfHeight = context.canvas.height / 2;
        var halfOfWidth = context.canvas.width / 2;

        context.beginPath();
        context.arc(halfOfWidth, halfOfHeight, this.currentRadius, 0, 2*Math.PI);
        context.closePath();
        context.strokeStyle = "white";
        context.lineWidth = 10;
        context.fillStyle = "rgba(0, 0, 0, 0)";
        context.fill();
        context.stroke();

    };


    var contextLayer = new ContextLayer();


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

        contextLayer.countAlgorithm();
        contextLayer.drawSimpleCircle();

    };


    /*
     *
     */
    (function animationLoop(){
        requestAnimFrame(animationLoop);
        contextLayer.iteratorNumber++;
        animationRenderer();
    })();


})();