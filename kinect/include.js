
    


    
    function kinectMove(kinectX, kinectY, ctx) {

        ctx.fillCircle = function(x, y, radius, fillColor) {
          this.fillStyle = fillColor;
          this.beginPath();
          this.moveTo(x, y);
          this.arc(x, y, radius, 0, Math.PI * 2, false);
          this.fill();
        };

        $("#x").text("x: " + kinectX);
        $("#y").text("y: " + kinectY);
        var x = kinectX * 10 - 100;
        var y = kinectY * 10 - 150;
        var radius = 40; // or whatever
        var fillColor = '#ff0000';
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillCircle(x, y, radius, fillColor);

    };



    function createCanvas(parent, width, height) {
        var canvas = {};
        canvas.node = document.createElement('canvas');
        canvas.context = canvas.node.getContext('2d');
        canvas.node.width = width || 100;
        canvas.node.height = height || 100;
        parent.appendChild(canvas.node);
        return canvas;
    }

    function init(idOfCnavas, width, height, fillColor) {

        var container = document.getElementById(idOfCnavas);
        var canvas = createCanvas(container, width, height);
        var ctx = canvas.context;
        // define a custom fillCircle method
        
        DepthJS = {
          onKinectInit: function() {
            $("#message").text("DepthJS + Kinect detected+!@");
            $("#registration").text("Hand not in view");
          },
          onRegister: function(x, y, z, data) {
            $("#message").text("Hand in view" + (data == null ? "" : ": " + data));
            $("#x").text("x: " + x);
            $("#y").text("y: " + y);
            $("#z").text("z: " + z);
          },
          onUnregister: function() {
            $("#message").text("Hand not in view");
            $("#x").text("");
            $("#y").text("");
            $("#z").text("");
          },
          onMove: function(x, y, z) {
            kinectMove(x, y, ctx);
          },
          onSwipeLeft: function() {
            $("#misc").text("swipe left");
          },
          onSwipeRight: function() {
            $("#misc").text("swipe right");
          },
          onSwipeDown: function() {
            $("#misc").text("swipe down");
          },
          onSwipeUp: function() {
            $("#misc").text("swipe up");
          },
          onPush: function() {
            $("#misc").text("push");
          },
          onPull: function() {
            $("#misc").text("pull");
          }
        };

        ctx.clearTo = function(fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);
        };
        ctx.clearTo(fillColor || "#ddd");
    }
