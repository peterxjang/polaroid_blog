$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // create a wrapper around native canvas element (with id="c")
  var canvas = new fabric.Canvas('canvas', {
    backgroundColor: '#333',
    HOVER_CURSOR: 'pointer'
  });

  var group = polaroid('my-img', function() {
    console.log('selected an object!');
  });
  canvas.add(group);

  // globscale=1;
  // function displaywheel(e){
  //   var SCALE_FACTOR = 1.1;
  //   var evt=window.event || e
  //   var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta
  //   var objects = canvas.getObjects();
  //   var dd = 1;
  //   if (delta > 0) dd=SCALE_FACTOR;
  //   else dd=1/SCALE_FACTOR;
  //   globscale = globscale * dd;
  //     for (var i in objects) {
  //     objects[i].scaleX = globscale;
  //     objects[i].scaleY = globscale;
  //     objects[i].left = objects[i].left * dd;
  //     objects[i].top = objects[i].top * dd;
  //     objects[i].setCoords();
  //   }
  //   canvas.renderAll();
  //     canvas.calcOffset();
  // }
// var background = new fabric.Rect({
//     left: 0,
//     top: 0,
//     stroke: 'White',
//     width: 900,
//     height: 500,
//     scaleX: 1,
//     scaleY: 1,
//     selectable: false,
//     zoomScale: 1,
//     isBackground: true
// });
// canvas.add(background);
// fabric.util.loadImage('background.png', function (img) {
//     background.setPatternFill({
//         source: img,
//         repeat: 'repeat'
//     });
//     canvas.renderAll();
// });
zoomScale = 1;
$("body").on("mousewheel", function (event, delta) {
    var mousePageX = event.pageX;
    var mousePageY = event.pageY;
 
    var offset = $("#canvas").offset();
    var canvasX = offset.left;
    var canvasY = offset.top;
 
    // // Ignore if mouse is not on canvas
    // if (mousePageX < canvasX || mousePageY < canvasY || mousePageX > (canvasX + canvas.width)
    //             || mousePageY > (canvasY + canvas.height)) {
    //     return;
    // }
 
    // // Ignore if mouse is not on background
    // var background = getBackground();
 
    // var mouseOffsetX = event.offsetX;
    // var mouseOffsetY = event.offsetY;
 
    // if (mouseOffsetX < background.left || mouseOffsetX > background.left + background.currentWidth
    //             || mouseOffsetY < background.top || mouseOffsetY > background.top + background.currentHeight) {
    //     return;
    // }
 
    var scaleFactor = 1.1;
    var change = (delta > 0) ? scaleFactor : (1 / scaleFactor);
 
    // Limit zooming out
    var newZoomScale = zoomScale * change;
    // if (newZoomScale < 1) {
    //     return;
    // }
    zoomScale = newZoomScale;
 
    // var backgroundWidthOrig = (background.width * background.scaleX);
    // var backgroundHeightOrig = (background.height * background.scaleY);
    // canvas.setZoom(zoomScale);
    canvas.zoomToPoint({ x: event.offsetX, y: event.offsetY }, zoomScale);
    event.stopPropagation();
    event.preventDefault();
});





  // function displaywheel(e, delta) {
  //   console.log(delta)
  //   var newZoom = canvas.getZoom()+delta/300; //+ e.originalEvent.wheelDelta / 300;
  //   canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, newZoom);
  //   return false;
  // }
  // var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"
  // if (document.attachEvent) document.attachEvent("on"+mousewheelevt, displaywheel) 
  // else if (document.addEventListener) document.addEventListener(mousewheelevt, displaywheel, false)




    // function renderVieportBorders() {
    //   var ctx = canvas.getContext();

    //   ctx.save();

    //   ctx.fillStyle = 'rgba(0,0,0,0.1)';

    //   ctx.fillRect(
    //     canvas.viewportTransform[4],
    //     canvas.viewportTransform[5],
    //     canvas.getWidth() * canvas.getZoom(),
    //     canvas.getHeight() * canvas.getZoom());

    //   ctx.setLineDash([5, 5]);

    //   ctx.strokeRect(
    //     canvas.viewportTransform[4],
    //     canvas.viewportTransform[5],
    //     canvas.getWidth() * canvas.getZoom(),
    //     canvas.getHeight() * canvas.getZoom());

    //   // var viewport = canvas.getViewportCenter();
    //   //console.log(canvas.getZoom(), viewport.x, viewport.y);

    //   ctx.restore();
    // }

    // $(canvas.getElement().parentNode).on('wheel mousewheel', function(e) {

    //   // canvas.setZoom(canvas.getZoom() + e.originalEvent.wheelDelta / 300);

    //   var newZoom = canvas.getZoom() + e.originalEvent.wheelDelta / 300;
    //   canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, newZoom);

    //   renderVieportBorders();

    //   return false;
    // });

    var viewportLeft = 0,
        viewportTop = 0,
        mouseLeft,
        mouseTop,
        _drawSelection = canvas._drawSelection,
        isDown = false;

    canvas.on('mouse:down', function(options) {
      isDown = true;

      viewportLeft = canvas.viewportTransform[4];
      viewportTop = canvas.viewportTransform[5];

      mouseLeft = options.e.x;
      mouseTop = options.e.y;

      if (options.e.altKey) {
        _drawSelection = canvas._drawSelection;
        canvas._drawSelection = function(){ };
      }

      // renderVieportBorders();
    });

    canvas.on('mouse:move', function(options) {
      if (options.e.altKey && isDown) {
        var currentMouseLeft = options.e.x;
        var currentMouseTop = options.e.y;

        var deltaLeft = currentMouseLeft - mouseLeft,
            deltaTop = currentMouseTop - mouseTop;

        canvas.viewportTransform[4] = viewportLeft + deltaLeft;
        canvas.viewportTransform[5] = viewportTop + deltaTop;

        // console.log(deltaLeft, deltaTop);

        canvas.renderAll();
        // renderVieportBorders();
      }
    });

    canvas.on('mouse:up', function() {
      canvas._drawSelection = _drawSelection;
      isDown = false;
    });

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
