
;(function(){


    "use strict";


    window.mirror = {};
    mirror.ctx = document.getElementById("b").getContext("2d");
    mirror.pos = {x:0,y:0};

})()



;(function(){

    "use strict";

    var getBrowserSize = function(){
        return { width: window.innerWidth || document.body.clientWidth, height: window.innerHeight || document.body.clientHeight }
    }

    var getCorners = function(){
        return {
            tl:[0, 0],
            tr:[getBrowserSize().x, 0],
            bl:[0, getBrowserSize().y],
            br:[getBrowserSize().x, getBrowserSize().y]
        }
    }


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

        draw(getCorners().tl);
        draw(getCorners().tr);
        draw(getCorners().bl);
        draw(getCorners().br);

        mirror.ctx.strokeStyle="black";
        mirror.ctx.fillStyle = "black";
        mirror.ctx.fill();
        mirror.ctx.stroke();


    }

})();



;(function(){

    "use strict";

    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback){ window.setTimeout(callback, 1000 / 60); };
    })();

    (function animationLoop(){
        requestAnimFrame(animationLoop);
        mirror.render();
    })();

})();