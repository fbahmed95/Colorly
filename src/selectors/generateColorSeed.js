function generateColorSeed() {
  var letters = '0123456789ABCDEF';
  var color = '';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateMode() {
  var arrayOfModes = ['monochrome',
                      'analogic', 'complement', 'analogic-complement',
                      'triad', 'quad'];
  var randomNumber = getRandomInt(0, arrayOfModes.length-1);
  console.log('in generateMode');
  console.log('randomNumber', randomNumber);
  console.log('mode', arrayOfModes[randomNumber]);
  return arrayOfModes[randomNumber];

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { generateColorSeed , generateMode};
