(function(){


    "use strict";


    var staticCanvas = document.getElementById("s");
    var dynamicCanvas = document.getElementById("d");
    var staticCtx = staticCanvas.getContext("2d");
    var dynamicCtx = dynamicCanvas.getContext("2d");

    // default values
    var ORBIT_RADIUS = 38;
    var PLANET_RADIUS = 4.6;
    var EACH_OTHER_DELAY = 69.4;
    var GAP_BETWEEN_ORBITS = 36;
    var IN_THE_ROW = 24;
    var SPEED = 0.05;
    var COLOR_PLANET = "#E65544";
    var COLOR_ORBIT = "#ddd";


    // radio buttons binding
    var radios = document.getElementsByName("animation");
    for (var i=radios.length; i--;) {
        radios[i].onclick = function (e) {
            EACH_OTHER_DELAY = e.target.value;
        };
    }


    var refsToPlanetsCtxs = [];
    var SolarSystem = function(opts){
        refsToPlanetsCtxs.push(this);
        this.opts = opts;
        this.drawOrbit(opts);
    };

    SolarSystem.prototype.drawPlanet = function(pos){
        dynamicCtx.beginPath();
        dynamicCtx.arc(this.opts.x+pos.x, this.opts.y+pos.y, PLANET_RADIUS, 0, 2*Math.PI);
        dynamicCtx.closePath();
        dynamicCtx.fillStyle = COLOR_PLANET;
        dynamicCtx.fill();
    };

    SolarSystem.prototype.drawOrbit = function(position){
        staticCtx.beginPath();
        staticCtx.arc(position.x, position.y, ORBIT_RADIUS, 0, 2*Math.PI);
        staticCtx.closePath();
        staticCtx.strokeStyle = COLOR_ORBIT;
        staticCtx.stroke();
    };



    var clearCanvas = function(){
        dynamicCtx.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height);
    };



    var justIterate = 0;
    var clearAndRedrawPlanetsOfDelay = function(){

        var MAXMIN_OF_SIN = ORBIT_RADIUS;
        var MAXMIN_OF_COS = ORBIT_RADIUS;

        clearCanvas();
        justIterate += SPEED;

        refsToPlanetsCtxs.forEach(function(ctx, delay){
            delay = justIterate+EACH_OTHER_DELAY*delay;
            var newCoords = { x: MAXMIN_OF_SIN*Math.cos(delay), y: MAXMIN_OF_COS*Math.sin(delay)};
            ctx.drawPlanet(newCoords);
        });

    };



    var initSolarSystem = function(){

        clearCanvas();

        for (var dotsRound=1; dotsRound<440; ++dotsRound){
            var coordinates = {
                x: dotsRound % IN_THE_ROW * GAP_BETWEEN_ORBITS,
                y: ~~(dotsRound / IN_THE_ROW) * GAP_BETWEEN_ORBITS,
                delay: (dotsRound)
            };
            new SolarSystem(coordinates);
        }

    };



    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || function (callback){ window.setTimeout(callback, 1000/60); };
    })();
    (function animationFrameLoop(){
        requestAnimFrame(animationFrameLoop);
        clearAndRedrawPlanetsOfDelay();
    })();



    initSolarSystem();



})();