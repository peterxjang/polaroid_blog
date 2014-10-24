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
      originX: 'center'
    });
    var group = new fabric.Group([rectangle, imgInstance, text], {
      left: left,
      top: top,
      angle: angle
    });
    group.on('selected', onClick);
    return group;

  }
