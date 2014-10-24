$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // create a wrapper around native canvas element (with id="canvas")
  var canvas = new fabric.Canvas('canvas', {
    backgroundColor: '#333',
    HOVER_CURSOR: 'pointer',
  });
  canvas.setWidth(window.innerWidth*0.8);
  canvas.setHeight(window.innerHeight*0.8);
  makeCanvasZoomable(canvas);

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



  $.ajax({
    url: '/posts_polariod',
    type: "GET",
    success: function(response) {
      console.log(response);
      $('img').each(function(index){
        console.log($(this))
        var group = polaroid($(this).attr('id'), $(this).attr('id'), 150, 100, -10, function() {
          console.log('selected object:' + index);
          canvas.bringToFront(canvas.getActiveObject());
        });
        canvas.add(group);
      })
    },
    error: function(response) {
      console.log(response);
    }
  });
  $('#save-layout').on('click', function(e){

    // $('img').each(function(index){
    //   console.log($(this))
    //   var group = polaroid($(this).attr('id'), $(this).attr('id'), 150, 100, -10, function() {
    //     console.log('selected object:' + index);
    //   });
    //   canvas.add(group);
    // })
  })


  // var group = polaroid('my-img', function() {
  //   console.log('selected an object!');
  // });
  // canvas.add(group);



  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
