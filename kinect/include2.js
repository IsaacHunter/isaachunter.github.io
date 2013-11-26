  function kinectMove(kinectX, kinectY, ctx) {

        ctx.fillCircle = function(x, y, radius, fillColor) {
          this.fillStyle = fillColor;
          this.beginPath();
          this.moveTo(x, y);
          this.arc(x, y, radius, 0, Math.PI * 2, false);
          this.fill();
		  return this.getImageData(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
        };

		
        var radius = 40; // or whatever
		
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
		
		var w       = canvas.width = canvas.height = 100;
		var drawn   = null;
		var len     = d.data.length;
		
		for(var i =0; i< len; i++) {
			if(!d.data[i]) {
				drawn = false;
			}else if(d.data[i]) {
				drawn = true;
				alert('Something drawn on Canvas');
				break;
			}
		}
		
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
        
		$(window).mousemove(function (event) {
			kinectMove(event.pageX, event.pageY, ctx);
		});
		
        ctx.clearTo = function(fillColor) {
			var imageObj = new Image();

			imageObj.onload = function() {
				ctx.drawImage(imageObj,0,0, width, height);
			};
			imageObj.src = 'background.png';
			
			//ctx.drawImage(img,0,0, width, height);
            /*ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);*/
        };
        ctx.clearTo(fillColor || "#ddd");
    }
