/*
**
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
**
**
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
**
**/
;(function(){

    "use strict";

    var increase = 0;


    mirror.mirroring = function(x,y){

        increase++;

        x = 140 * Math.cos(increase);
        y = 140 * Math.sin(increase);

        mirror.ctx.beginPath();



        mirror.ctx.fillCircle = function(x, y){
            this.beginPath();
            this.moveTo(x, y);
            this.arc(mirror.getCenter.x+x-10, mirror.getCenter.y+y-10, 2, 0, Math.PI*2, false);
            this.arc(mirror.getCenter.x+x, mirror.getCenter.y+y, 2, 0, Math.PI*2, false);
            this.fill();
        };

        mirror.ctx.fillCircle(x,y);


    };





})();



/*
**
**
**/
;(function(){

    "use strict";


    (function animationLoop(){
        setTimeout(animationLoop, 50);
        mirror.mirroring();
    })();

})();