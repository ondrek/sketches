/*
**
**/
;(function(){


    "use strict";


    window.mirror = {};
    mirror.canvas = document.getElementById("b");
    mirror.ctx = mirror.canvas.getContext("2d");
    mirror.pos = {x:0,y:0};

    var getBrowserSize = function(){
        return {
            width: window.innerWidth || document.body.clientWidth,
            height: window.innerHeight || document.body.clientHeight
        }
    };

    mirror.getCenter = {
        x: getBrowserSize().width/2,
        y: getBrowserSize().height/2
    };

})();



/*
**  drawing the background of the whole image
**/
;(function(){

    "use strict";


    mirror.ctx.lineWidth = 0.2;
    mirror.ctx.strokeStyle="#cccccc";

    for (var angle=0; angle<360; angle+=90/3){
        var length = 5000;
        var theAngle = (angle * Math.PI)/180; // degrees to radians
        mirror.ctx.beginPath();
        mirror.ctx.moveTo(mirror.getCenter.x, mirror.getCenter.y);
        mirror.ctx.lineTo(mirror.getCenter.x + length * Math.cos(theAngle), mirror.getCenter.y + length * Math.sin(theAngle));
        mirror.ctx.stroke();
    }

})();



/*
**
**/
;(function(){

    "use strict";

    mirror.canvas.onmousemove = function(e){

        if (!mirror.canvas.isDrawing) {
            return;
        }

        mirror.mirroring(
            e.pageX-this.offsetLeft,
            e.pageY-this.offsetTop
        );

        mirror.ctx.beginPath();
        mirror.ctx.moveTo(e.pageX-this.offsetLeft, e.pageY-this.offsetTop);
        mirror.ctx.arc(e.pageX-this.offsetLeft, e.pageY-this.offsetTop, 2, 0, Math.PI*2, false);
        mirror.ctx.fill();

    };

    mirror.canvas.onmousedown = function(){
        mirror.canvas.isDrawing = true;
    };

    mirror.canvas.onmouseup = function(){
        mirror.canvas.isDrawing = false;
    };


})();



/*
**
**
**/
;(function(){

    "use strict";



    mirror.mirroring = function(posX, posY){

        // posX -= mirror.getCenter.x;
        // posY -= mirror.getCenter.y;
        // console.info("center points:", posX-mirror.getCenter.x, posY-mirror.getCenter.y);


        //if (increase>11) { return; } else { increase++; }

        console.info(
            "absolute",
            Math.abs(posX-mirror.getCenter.x),
            Math.abs(posY-mirror.getCenter.y)
        );



        for (var i=0; i<12; i++){

            var distance = 100;
            var by = 6;

            var x = posX+ distance* Math.cos(i*Math.PI/by);
            var y = posY+ distance* Math.sin(i*Math.PI/by);

            mirror.ctx.fillCircle = function(x, y){
                this.beginPath();
                this.arc(x, y, 2, 1, Math.PI*2, false);
                this.fill();
            };

            mirror.ctx.fillCircle(x,y);

        }




    };

    //mirror.mirroring(0, 0);


})();


//
// /*
// **
// **/
// ;(function(){
//
//     "use strict";
//
//     window.requestAnimFrame = (function(){
//         return window.requestAnimationFrame ||
//             window.webkitRequestAnimationFrame ||
//             window.mozRequestAnimationFrame ||
//             function(callback){ window.setTimeout(callback, 1000 / 60); };
//     })();
//
//
//
//     (function animationLoop(){
//         setTimeout(animationLoop, 800);
//         //requestAnimFrame(animationLoop);
//
//     })();
//
// })();