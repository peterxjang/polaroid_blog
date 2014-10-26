$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // create a wrapper around native canvas element (with id="canvas")
  var canvas = new fabric.Canvas('canvas', {HOVER_CURSOR: 'pointer'});
  canvas.renderOnAddRemove = false;
  canvas.setWidth(window.innerWidth);
  canvas.setHeight(window.innerHeight);
  makeCanvasZoomable(canvas);
  window.addEventListener('resize', resizeCanvas, false);
  function resizeCanvas() {
    canvas.setWidth(window.innerWidth);
    canvas.setHeight(window.innerHeight);
    canvas.renderAll();
  }
  //         canvasWrapper.width = window.innerWidth;
  //         canvasWrapper.height = window.innerHeight;
  //         drawStuff();
  // }
  // resizeCanvas();
  // function drawStuff() {
  //         do your drawing stuff here
  //         canvas.renderAll();
  // }


  // create a wrapper around native canvas element (with id="canvas")
  // canvas = new fabric.Canvas('canvas', {
  //   // backgroundColor: '#333',
  //   HOVER_CURSOR: 'pointer',
  // });
  // // canvas.setWidth(window.innerWidth*0.8);
  // // canvas.setHeight(window.innerHeight*0.8);
  // makeCanvasZoomable(canvas);
  // $("#canvas").fabric = canvas;
  // document.getElementById("canvas").fabric = canvas;

  // var $canvas = document.getElementById('canvas'), context = canvas.getContext('2d');
  // // resize the canvas to fill browser window dynamically
  // window.addEventListener('resize', resizeCanvas, false);
  // function resizeCanvas() {
  //         $canvas.width = window.innerWidth;
  //         $canvas.height = window.innerHeight;
  //         /**
  //          * Your drawings need to be inside this function otherwise they will be reset when
  //          * you resize the browser window and the canvas goes will be cleared.
  //          */
  //         // drawStuff();
  // }
  // resizeCanvas();


  $("#edit-polaroids").on("click", function(event){
    event.preventDefault();
    $.ajax({
      url: '/posts_polaroid',
      type: "GET",
      dataType: 'json',
      success: function(response) {
        $('#container').hide();
        // $('#posts-container').html("");
        $('#div-top').append("<button id='save-layout'>Save layout</button>");
        // $('#posts-container').append("<canvas id='canvas'></canvas>");
        loadPostImages(canvas, response);

      },
      error: function(response) {
        console.log(response);
      }
    });
  });

  $('body').on('click', '#save-layout', function(e){
    // canvas = $("#canvas").fabric;
    var objects = canvas.getObjects();
    for (var i=0; i<objects.length; i++) {
      object = objects[i];
      console.log(object.post_id+":"+object.scaleX);
    }

    $.ajax({
      url: '/posts_polaroid_state',
      type: "POST",
      dataType: 'json',
      data: {state: canvas.toJSON()},
      success: function(response) {
        console.log(canvas.toJSON());
        window.location.href = '/posts';
        $('#posts-container').show();
      }
    })

  });


  $("#view-polaroids").on("click", function(event){
    event.preventDefault();
    $.ajax({
      url: '/posts_polaroid',
      type: "GET",
      dataType: 'json',
      success: function(response) {
        $('#container').hide();
        console.log(canvas);
        console.log(response.state);
        // canvas.selection = false;
        // var objects = canvas.getObjects();
        // for (var i=0; i<objects.length; i++) {
        //   object = objects[i];
        //   // console.log(object.post_id+":"+object.scaleX);
        //   // object.set('selectable', false);
        //   object.evented = false;
        // }
        // canvas.deactivateAll();
        canvas.removeListeners();
        loadPostImages(canvas, response);
        canvas.loadFromJSON(response.state);
        canvas.renderAll();
      }
    });
  });

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
