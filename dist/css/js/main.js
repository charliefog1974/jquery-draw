$(function () {
    var draw = (function () {

        //Get the height and width of the main we will use this set canvas to the full
        //size of the main element.
        var mWidth = $('main').offsetWidth,
            mHeight = $('main').offsetHeight,

            //Create the canvas
            canvas = $("canvas"),

            //Create the context
            ctx = canvas.getContext("2d"),

            //Create the initial bounding rectangle
            rect = canvas.getBoundingClientRect(),

            //current x,y
            x = 0,
            y = 0,

            //starting x,y
            x1 = 0,
            y1 = 0,

            //ending x,y
            x2 = 0,
            y2 = 0;

        //What shape are we drawing?
        shape = '';

        //path tracking
        isDrawing = false;


        return {
            //Set the x,y coords based on current event data
            setXY: function (evt) {

                //Track the last x,y position before setting the current position.
                lx = x;
                ly = y;

                //Set the current x,y position
                x = (evt.clientX - rect.left) - canvas.offsetLeft;
                y = (evt.clientY - rect.top) - canvas.offsetTop;

            },

            //Write the x,y coods to the target div
            writeXY: function () {
                document.getElementById('trackX').innerHTML = 'X: ' + x;
                document.getElementById('trackY').innerHTML = 'Y: ' + y;
            },

            // writeXY: function () {
            //     $('trackX').innerHTML = 'X: ' + x;
            //     $('trackY').innerHTML = 'Y: ' + y;
            // },

            setStart: function () {
                x1 = x;
                y1 = y;
            },

            setEnd: function () {
                x2 = x;
                y2 = y;
            },

            //Sets the shape to be drawn
            setShape: function (shp) {
                shape = shp;
            },

            //path public API call
            getShape: function () {
                return shape;
            },

            //path setters
            setIsDrawing: function (bool) {
                isDrawing = bool;
            },

            getIsDrawing: function () {
                return isDrawing;
            },

            //Draws the selected shape
            draw: function () {
                ctx.restore();
                if (shape === 'rectangle') {
                    this.drawRect();
                } else if (shape === 'line') {
                    this.drawLine();
                } else if (shape === 'circle') {
                    this.drawCircle();
                } else if (shape === 'path') {
                    this.drawPath();
                } else if (shape === 'triangle') {
                    this.drawTriangle();
                } else {
                    alert('Please choose a shape');
                }
                ctx.save();
            },

            //Draw a triangle
            drawTriangle: function () {
                ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
                ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
                ctx.beginPath();
                ctx.moveTo(lx, ly);
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineTo(lx, ly);
                ctx.fill();

            },

            //draw a path
            drawPath: function () {
                //Start by using random fill colors.
                ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
                ctx.beginPath();
                ctx.moveTo(lx, ly);
                ctx.lineTo(x, y);
                ctx.stroke();
            },


            //Draw a circle
            drawCircle: function () {

                ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
                ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);

                let a = (x1 - x2)
                let b = (y1 - y2)
                let radius = Math.sqrt(a * a + b * b);

                ctx.beginPath();
                ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
            },

            //Draw a line
            drawLine: function () {
                //Start by using random fill colors.
                ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            },

            drawRect: function (x, y, h, w) {

                //Start by using random fill colors.
                ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);

                ctx.fillRect(x1, y1, (x2 - x1), (y2 - y1));

            },


            getCanvas: function () {
                return canvas;
            },

            //Initialize the object, this must be called before anything else
            init: function () {
                canvas.width = mWidth;
                canvas.height = mHeight;
                $('main').append("canvas");

            }
        };

    })();

    //Initialize draw
    draw.init();

    //Add a mousemove listener to the canvas
    //When the mouse reports a change of position use the event data to
    //set and report the x,y position on the mouse.
    draw.getCanvas().addEventListener('mousemove', function (evt) {
        draw.setXY(evt);
        draw.writeXY();
        if (draw.getShape() == 'path' && draw.getIsDrawing() === true) {
            draw.draw();
        }
        if (draw.getShape() == 'triangle' && draw.getIsDrawing() === true) {
            draw.draw();
        }
    }, false);

    //Set the starting position
    draw.getCanvas().addEventListener('mousedown', function () {
        draw.setStart();
        draw.setIsDrawing(true);
    }, false);

    //Add a mouseup listener to the canvas
    //Set the end position and draw the rectangle
    draw.getCanvas().addEventListener('mouseup', function () {
        draw.setEnd();
        draw.draw();
        draw.setIsDrawing(false);
    }, false);


    // draw.getCanvas().addEventListener('mouseup', function () {
    //     draw.setEnd();
    //     draw.drawRect();
    // }, false);

    //set rectangle
    document.getElementById('btnRect').addEventListener('click', function () {
        draw.setShape('rectangle');
    }, false);

    //draw a line
    document.getElementById('btnLine').addEventListener('click', function () {
        draw.setShape('line');
    }, false);

    document.getElementById('btnCircle').addEventListener('click', function () {
        draw.setShape('circle');
    }, false);

    //draw a path
    document.getElementById('btnPath').addEventListener('click', function () {
        draw.setShape('path');
    }, false);

    //draw a triangle
    document.getElementById('btnTriangle').addEventListener('click', function () {
        draw.setShape('triangle');
    }, false);
});


// //set rectangle
// $('btnRect').addEventListener('click', function () {
//     draw.setShape('rectangle');
// }, false);

// //draw a line
// $('btnLine').addEventListener('click', function () {
//     draw.setShape('line');
// }, false);

// $('btnCircle').addEventListener('click', function () {
//     draw.setShape('circle');
// }, false);

// //draw a path
// $('btnPath').addEventListener('click', function () {
//     draw.setShape('path');
// }, false);

// //draw a triangle
// $('btnTriangle').addEventListener('click', function () {
//     draw.setShape('triangle');
// }, false);


//***end of new code */


  //draw a sample rectangle
//   draw.drawRect();

//****old code*****//

// //Get the height and width of the main we will use this set canvas to the full
// //size of the main element.
// var mWidth = document.querySelector('main').offsetWidth;
// var mHeight = document.querySelector('main').offsetHeight;

// //Create the canvas
// var canvas = document.createElement("canvas");
// canvas.width = mWidth;
// canvas.height = mHeight;
// document.querySelector('main').appendChild(canvas);

// //Create the context
// var ctx = canvas.getContext("2d");

// //Draw some sample rectangles
// ctx.fillStyle = "rgb(200,0,0)";
// ctx.fillRect(10, 10, 55, 50);

// ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
// ctx.fillRect(30, 30, 55, 50);

// //Track the x,y position
// canvas.addEventListener('mousemove', function (evt) {

//     //Calculate the x,y cords.
//     var rect = canvas.getBoundingClientRect();
//     let x = evt.clientX - rect.left;
//     let y = evt.clientY - rect.top;

//     //Write the cords back the UI.
//     $('trackX').innerHTML = 'X: ' + x;
//     $('trackY').innerHTML = 'Y: ' + y;

// }, false);