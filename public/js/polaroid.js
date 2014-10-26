function polaroid(id, caption, left, top, angle, onClick) {
  var imgElement = document.getElementById(id);
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
  var group = new fabric.Group([rectangle, imgInstance, text], {
    left: left,
    top: top,
    angle: angle
  });
  rectangle.setShadow("5px 5px 5px rgba(0, 0, 0, 0.3)");
  group.on('selected', onClick);
  return group;
}

function loadPostImagesEdit(canvas, canvasData, canvasZoom, objectsData) {
  loadPostImages(canvas, canvasData, canvasZoom, objectsData, false);
}

function loadPostImagesView(canvas, canvasData, canvasZoom, objectsData) {
  canvas.removeListeners();
  loadPostImages(canvas, canvasData, canvasZoom, objectsData, true);
}

function loadPostImages(canvas, canvasData, canvasZoom, objectsData, makeLinks) {
  if (canvasData) { canvas.setViewportTransform(canvasData); }
  zoomScale = canvasZoom;
  // console.log(canvasData);
  var loader = new PxLoader();
  console.log(objectsData);
  for (var i=0; i< objectsData.length; i++){
    var post = objectsData[i];
    $('#posts-container').append('<img id="' + post.id + '" class="polaroid" src="' + post.url + '" />');
    loader.addImage(post.url);
  }
  loader.addCompletionListener(function(){
    for (var i=0; i< objectsData.length; i++){
      var post = objectsData[i];
      var group = polaroid(post.id, post.title, post.left+20*i, post.top+20*i, post.angle, function() {
        canvas.bringToFront(canvas.getActiveObject());
      });
      group.post_id = post.id;
      // console.log(post.id+" load: "+post.scaleX+", "+post.scaleY)
      if (post.scaleX && post.scaleY) {
        group.setScaleX(post.scaleX);
        group.setScaleY(post.scaleY);
      }
      else {
        group.scaleToHeight(300);
      }
      canvas.add(group);
    }
    canvas.renderAll();
  })
  loader.start();
}
