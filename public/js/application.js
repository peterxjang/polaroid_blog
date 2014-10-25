$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // create a wrapper around native canvas element (with id="canvas")
  // canvas = new fabric.Canvas('canvas', {
  //   backgroundColor: '#333',
  //   HOVER_CURSOR: 'pointer',
  // });
  // canvas.setWidth(window.innerWidth*0.8);
  // canvas.setHeight(window.innerHeight*0.8);
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


  $("#link-polaroids").on("click", function(event){
    event.preventDefault();
    $.ajax({
      url: '/posts_polariod',
      type: "GET",
      dataType: 'json',
      success: function(response) {
        // $('main').html("");
        $('#posts-container').html("");
        $('#posts-container').append("<button id='save-layout'>Save layout</button>");
        $('#posts-container').append("<canvas id='canvas'></canvas>");
        // canvas = $("#canvas").fabric;
        // var canvas = document.getElementById("canvas").fabric;
        canvas = new fabric.Canvas('canvas', {
          // backgroundColor: '#333',
          HOVER_CURSOR: 'pointer',
          renderOnAddRemove: false
        });
        canvas.setWidth(window.innerWidth*0.8);
        canvas.setHeight(window.innerHeight*0.8);
        // canvas.renderOnAddRemove = false;
        makeCanvasZoomable(canvas);

        // console.log(response.state);
        $("#canvas").fabric = canvas;
        for (var i=0; i< response.posts.length; i++){
          var post = response.posts[i];
          $('#posts-container').append('<img id="' + post.id + '" class="polaroid" src="' + post.url + '" />')
          var group = polaroid(post.id, post.title, 150, 100, 0, function() {
            // console.log('selected object:' + index);
            canvas.bringToFront(canvas.getActiveObject());
          });
          group.post_id = post.id;
          canvas.add(group);
        }
        // if (response.state) {
        if (false) {
          canvas.loadFromJSON(response.state);
        }
        // canvas.loadFromJSON(json,canvas.renderAll.bind(canvas));
        canvas.renderAll();


        // $('img').each(function(index){
        //   console.log($(this))
        //   var group = polaroid($(this).attr('id'), $(this).attr('id'), 150, 100, -10, function() {
        //     console.log('selected object:' + index);
        //     canvas.bringToFront(canvas.getActiveObject());
        //   });
        //   canvas.add(group);
        // })
      },
      error: function(response) {
        console.log(response);
      }
    });
  });

  $('body').on('click', '#save-layout', function(e){
    // canvas = $("#canvas").fabric;
    // console.log(canvas.toJSON());

    var objects = canvas.getObjects();
    for (var i=0; i<objects.length; i++) {
      object = objects[i];
      console.log(object.post_id);
    }

    $.ajax({
      url: '/posts_polariod_state',
      type: "POST",
      dataType: 'json',
      data: {state: canvas.toJSON()},
      success: function(response) {
        window.location.href = '/posts';
      }
    })
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
