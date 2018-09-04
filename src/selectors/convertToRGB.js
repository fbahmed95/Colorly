function convertToRGB(fullColorHexString) {
  var colorTextRGB = fullColorHexString.substring(4, fullColorHexString.length - 1);
  colorTextRGB = colorTextRGB.split(", ");

  return fullColorHex(colorTextRGB[0], colorTextRGB[1], colorTextRGB[2])
}


var rgbToHex = function (rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

var fullColorHex = function(r,g,b) {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red+green+blue;
};


export { convertToRGB };
