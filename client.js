

    "use strict";


    /*
     *
     */
    var ContextLayer = function(options){

        contexts.push( this );

        // set options with speed, canvas reference and more
        this.options = options;

        // local contexts
        this.ctx = this.options.context;

        // used for saving current angle position of rotation
        this.angleIndex = 0;

    };


    ContextLayer.prototype.iteration = 0;

    /*
     *
     */
    ContextLayer.prototype.rotateCanvas = function(){

        this.ctx.save();

        var halfOfCanvasSizeWidth = this.ctx.canvas.width/2;
        var halfOfCanvasSizeHeight = this.ctx.canvas.height/2;
        var newAngle = this.angleIndex*0.001;

        this.ctx.translate(halfOfCanvasSizeWidth, halfOfCanvasSizeHeight);
        this.ctx.rotate(newAngle);
        this.ctx.translate(-halfOfCanvasSizeWidth, -halfOfCanvasSizeHeight);

        var howManyCircles =this.options.number;
        var radiusOfCircle = this.options.radius;

        this.createAnCircumference(radiusOfCircle, howManyCircles);

        this.ctx.restore();

    };


    /*
     *
     */
    ContextLayer.prototype.createAnCircumference = function(radius, circles){

        var centerX = this.ctx.canvas.width/2;
        var centerY = this.ctx.canvas.height/2;

        var alpha = ((2 * Math.PI) / circles);

        var radFactor = Math.PI * ( Math.abs( 60 - this.iteration % 120 ) / 60 );
        var actualRadius = radius * ( (1 + 0.2 * Math.sin(radFactor) ) );
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

        this.ctx.beginPath();
        this.ctx.arc(posX, posY, radius, 0, 2*Math.PI, false);
        this.ctx.closePath();
        this.ctx.strokeStyle="white";
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.stroke();

    };


    var canvasElement = document.getElementById("b");
    var context = canvasElement.getContext("2d");
    var contexts = [];


    for (var i=0; i<=8; i++){

        var speedOf = i*5;
        var numberOf = 46 - (i*5);
        var radiusOf = 180 - (20*i);

        new ContextLayer({
            speed : speedOf,
            context : context,
            number : numberOf,
            radius : radiusOf
        });

    }


    setInterval(function(){

        var widthCanvas  = context.canvas.width;
        var heightCanvas = context.canvas.height;

        context.clearRect(0, 0, widthCanvas, heightCanvas);

        for (var i=0, l=contexts.length; i<l; ++i){
            contexts[i].iteration++;
            var layer = contexts[ i ];
            layer.angleIndex += layer.options.speed;
            layer.rotateCanvas();
        }

    }, 1000/60);

