var canvas = {};
var ctx;
var container;
var canSwipe = false;

var images = [
    {
        foreground: "1new.jpg",
        background: "1old.jpg"
    },
    {
        foreground: "2new.jpg",
        background: "2old.jpg"
    },
    {
        foreground: "3new.jpg",
        background: "3old.jpg"
    },
    {
        foreground: "4new.jpg",
        background: "4old.jpg"
    },
    {
        foreground: "5new.jpg",
        background: "5old.jpg"
    }

]

var currentImg = images[0];

function kinectMove(kinectX, kinectY, ctx) {

    ctx.fillCircle = function(x, y, radius, fillColor) {
      this.fillStyle = fillColor;
      this.beginPath();
      this.moveTo(x, y);
      this.arc(x, y, radius, 0, Math.PI * 2, false);
      this.fill();
	  return this.getImageData(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
    };

    $(".jumbotron").addClass("alignBottom")
	
    var radius = 80; // or whatever
	
    $("#x").text("x: " + kinectX);
    $("#y").text("y: " + kinectY);
	var circleCoords = { "left": kinectX, "top": kinectY }
	
	
	$("#circle").css(circleCoords);
	var offset = $("#canvas").offset();
	
    var canvasX = kinectX + radius - offset.left;
    var canvasY = kinectY + radius - offset.top;
    var fillColor = '#ff0000';
    ctx.globalCompositeOperation = 'destination-out';
    d = ctx.fillCircle(canvasX, canvasY, radius, fillColor);
	
	var len = d.data.length;
    var count = 0;
	for(var i = 0; i< len; i++) {
		if(d.data[i]) {
			count ++;
		}
	}
    var percentage = Math.floor((count / len) * 100);
	$("#message").text(percentage + '%');

    if (percentage && percentage < 2) {
        canSwipe = true;
        $("canvas").css({'opacity' : '0'});
        $(".jumbotron").removeClass("alignBottom")
        $('#message').text("Swipe down to start next image")
    }
	
};

function loadImage() {
    $("canvas").css({'opacity' : '1'});

    if (images.indexOf(currentImg) === images.length - 1) {
        currentImg = images[0];
    }
    else {
        currentImg = images[images.indexOf(currentImg) + 1];
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect (0, 0, canvas.width, canvas.height);

    $('#image').attr("src", currentImg.foreground);
    $("#image").load(function() {
        canvas.node.width = $(this).width();
        canvas.node.height = $(this).height();
        img = document.getElementById("image");
        ctx.drawImage(img, 0, 0, $(this).width(), $(this).height());
        container.style.display = 'block';
        $('#canvas').css({
            'background-image' : 'url(' + currentImg.background + ')', 
            'width' : $(this).width(),
            'height' : $(this).height()
        });
        canSwipe = false;
    });
};

function init() {
    container = document.getElementById('canvas');
    canvas.node = document.createElement('canvas');
    canvas.context = canvas.node.getContext('2d');
    container.appendChild(canvas.node);
    canvas.node.width = 100;
    canvas.node.height = 100;
    ctx = canvas.context;

    DepthJS = {
        onKinectInit: function() {
            $("#message").text("Kinect Detected. Wave Your Hand");
        },
        onRegister: function(x, y, z, data) {
        },
        onUnregister: function() {
            $("#message").text("Hand not in view");
        },
        onMove: function(x, y, z) {
            if (!canSwipe) {
                x = x * 40 - 1000;
                y = y * 40 - 1000;
                kinectMove(x, y, ctx);
            }
        },
        onSwipeLeft: function() {
        },
        onSwipeRight: function() {
        },
        onSwipeDown: function() {  
            if (canSwipe) { loadImage(); } 
        },
        onSwipeUp: function() {
        },
        onPush: function() {
        },
        onPull: function() {
        }
    };

    loadImage();
};
