function polaroid(id, caption, left, top, angle, onClick) {
  var imgElement = document.getElementById(id);
  // $('#'+id)
  //   .load(function(){
  //     // $('#result1').text('Image is loaded!');
  //     // console.log('Image is loaded!');
  //   })
  //   .error(function(){
  //     // $('#result1').text('Image is not loaded!');
  //     console.log('Image is not loaded!');
  //   });

// function polaroid(imgElement, caption, left, top, angle, onClick) {
  var imgInstance = new fabric.Image(imgElement, {
    left: 100,
    top: 100,
    angle: 0,
  });
  imgInstance.H_PADDING = imgInstance.width / 40;
  imgInstance.V_PADDING = imgInstance.height / 10;
  var rectangle = new fabric.Rect({
    left: 100 - imgInstance.H_PADDING,
    top: 100 - imgInstance.H_PADDING,
    fill: '#fff',
    width: imgInstance.width + 2 * imgInstance.H_PADDING,
    height: imgInstance.height + 2* imgInstance.V_PADDING
  });
  var text = new fabric.Text(caption, {
    left: 100 + imgInstance.width / 2,
    top: 100 + imgInstance.height + imgInstance.H_PADDING * 2,
    fontSize:30,
    originY: 'center',
    originX: 'center',
    scaleX: imgInstance.height / 350,
    scaleY: imgInstance.height / 350
  });
  // text.scaleToHeight(imgInstance.H_PADDING);
  var group = new fabric.Group([rectangle, imgInstance, text], {
    left: left,
    top: top,
    angle: angle
  });
  rectangle.setShadow("5px 5px 5px rgba(0, 0, 0, 0.3)");
  group.on('selected', onClick);
  return group;

}


function loadPostImages(canvas, response) {
          var loader = new PxLoader();
        for (var i=0; i< response.posts.length; i++){
          var post = response.posts[i];
          $('#posts-container').append('<img id="' + post.id + '" class="polaroid" src="' + post.url + '" />');
          loader.addImage(post.url);
        }
        loader.addCompletionListener(function(){
          for (var i=0; i< response.posts.length; i++){
            var post = response.posts[i];
            var group = polaroid(post.id, post.title, 150+20*i, 100+20*i, 0, function() {
              canvas.bringToFront(canvas.getActiveObject());
            });
            group.post_id = post.id;
            group.scaleToHeight(300);
            canvas.add(group);
          }
          // if (response.state) {
          if (false) {
            canvas.loadFromJSON(response.state);
          }
          canvas.renderAll();
        })
        loader.start();
}
