$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // create a wrapper around native canvas element (with id="canvas")
  var canvas = new fabric.Canvas('canvas', {
    backgroundColor: '#333',
    HOVER_CURSOR: 'pointer'
  });
  makeCanvasZoomable(canvas);


  $.ajax({
    url: '/posts_polariod',
    type: "GET",
    success: function(response) {
      console.log(response);
      $('img').each(function(index){
        console.log($(this))
        var group = polaroid($(this).attr('id'), $(this).attr('id'), 150, 100, -10, function() {
          console.log('selected object:' + index);
        });
        canvas.add(group);
      })
    },
    error: function(response) {
      console.log(response);
    }
  });


  // var group = polaroid('my-img', function() {
  //   console.log('selected an object!');
  // });
  // canvas.add(group);



  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
