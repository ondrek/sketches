
;(function(){


    "use strict";


    window.mirror = {};
    mirror.ctx = document.getElementById("b").getContext("2d");
    mirror.pos = {x:0,y:0};

})()



;(function(){

    "use strict";

    var getBrowserSize = function(){
        return {
            width: window.innerWidth || document.body.clientWidth,
            height: window.innerHeight || document.body.clientHeight
        }
    };

    var getQuadrants = function(){
        return [
            [0, 0], // top left
            [getBrowserSize().width/2, 0], // top center
            [getBrowserSize().width, 0], // top right
            [0, getBrowserSize().height/2], // middle left
            [0, getBrowserSize().height], // bottom left
            [getBrowserSize().width/2, getBrowserSize().height], // bottom center
            [getBrowserSize().width, getBrowserSize().height], // bottom right
            [getBrowserSize().width, getBrowserSize().height/2] // middle right
        ]
    };


    mirror.render = function(){

        var center = {
            x: getBrowserSize().width/2,
            y: getBrowserSize().height/2
        };

        var draw = function(lines){
            mirror.ctx.beginPath();
            mirror.ctx.moveTo(center.x, center.y);
            mirror.ctx.lineTo(lines[0], lines[1]);
            mirror.ctx.stroke();
        };

        getQuadrants().forEach(function(el){
            draw(el);
        });

        mirror.ctx.strokeStyle="black";
        mirror.ctx.fillStyle = "black";
        mirror.ctx.fill();
        mirror.ctx.stroke();

    };

})();



;(function(){

    "use strict";

    window.requestAnimFrame = (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback){ window.setTimeout(callback, 1000 / 60); };
    })();

    (function animationLoop(){
        setTimeout(animationLoop, 400);
        //requestAnimFrame(animationLoop);
        mirror.render();
    })();

})();