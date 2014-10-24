$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // create a wrapper around native canvas element (with id="c")
  var canvas = new fabric.Canvas('canvas', {
    backgroundColor: '#333',
    HOVER_CURSOR: 'pointer'
  });

  // var PolaroidPhoto = fabric.util.createClass(fabric.Object, fabric.Observable, {
  //   H_PADDING: 20,
  //   V_PADDING: 50,
  //   originX: 'center',
  //   originY: 'center',
  //   initialize: function(src, options) {
  //     this.callSuper('initialize', options);
  //     this.image = new Image();
  //     this.image.src = src;
  //     this.image.onload = (function() {
  //       this.width = this.image.width;
  //       this.height = this.image.height;
  //       this.loaded = true;
  //       this.setCoords();
  //       this.H_PADDING = this.width / 40;
  //       this.V_PADDING = this.height / 10;
  //       this.fire('image:loaded');
  //     }).bind(this);
  //   },
  //   _render: function(ctx) {
  //     if (this.loaded) {
  //       ctx.fillStyle = '#fff';
  //       ctx.fillRect(
  //         -(this.width / 2) - this.H_PADDING,
  //         -(this.height / 2) - this.H_PADDING,
  //         this.width + this.H_PADDING * 2,
  //         this.height + this.V_PADDING * 2);
  //       ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
  //     }
  //   }
  // });
  // var photo = new PolaroidPhoto('../img/4.jpg', {
  //   top: 200,
  //   left: 200,
  //   angle: 0,
  // });
  // canvas.add(photo);
  // photo.on('image:loaded', canvas.renderAll.bind(canvas));
  // photo.drawBorders = photo.drawCorners = function() { return this };

  var imgElement = document.getElementById('my-img');
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
  var text = new fabric.Text('hello world', {
    left: 100 + imgInstance.width / 2,
    top: 100 + imgInstance.height + imgInstance.H_PADDING * 2,
    fontSize:30,
    originY: 'center',
    originX: 'center'
  });
  var group = new fabric.Group([rectangle, imgInstance, text], {
    left: 150,
    top: 100,
    angle: -10
  });
  group.on('selected', function() {
    console.log('selected an object');
  });


  canvas.add(group);

  $('body').on('click', '#my-img', function(){
    console.log("hello");
  });


  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
