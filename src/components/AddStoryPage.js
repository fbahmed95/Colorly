import React from 'react';
import { connect } from 'react-redux';
import StoryForm from './StoryForm';
import { startAddStory } from '../actions/stories';
import { convertToRGB } from '../selectors/convertToRGB';
import { generateColorSeed, generateMode } from '../selectors/generateColorSeed';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import * as Vibrant from 'node-vibrant'
var demoColorPicker;
var selectedElement;
export class AddStoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pText: props.pText ? props.pText : '#FFFFFF',
      dropdownOpen: false,
      selectedFile: null,
      imagePreviewUrl: null
    };

    this.toggle = this.toggle.bind(this);
    this.colorRandomAPICall = this.colorRandomAPICall.bind(this);
    this.colorSchemeAPICall = this.colorSchemeAPICall.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);

  }

  onSubmit = (story) => {
    this.props.startAddStory(story);
    this.props.history.push('/');
  };

  componentDidMount = () => {
    demoColorPicker = new window.iro.ColorPicker("#color-picker-container", {
        width: 250,
        height: 250,
        color: {r: 255 , g: 255, b: 255},
        markerRadius: 8,
        padding: 4,
        sliderMargin: 24,
        sliderHeight: 16,
        borderWidth: 0,
        borderColor: "#fff",
        anticlockwise: true,
      });
    selectedElement = document.getElementById("first");
  };
  // componentDidUpdate(prevProps) {
  // // Typical usage (don't forget to compare props):
  // console.log(prevProps);
  //   if(document.getElementById('img').src === this.props.imagePreviewUrl){
  //     var vibrant = new Vibrant(img);
  //     console.log('vibrant', vibrant);
  //     var swatches = vibrant.swatches()
  //     console.log('swatches', swatches);
  //     for (var swatch in swatches)
  //         if (swatches.hasOwnProperty(swatch) && swatches[swatch])
  //             console.log(swatch, swatches[swatch].getHex())
  //
  //   }
  // }

  onColorValChange = (e) => {
    var pText = e.target.value;
    if(pText.length === 7){
      var newHex = pText;
      if(newHex !== '#FFFFFF'){
        e.target.style.color = newHex;
      }
      selectedElement.style.backgroundColor = newHex;
      demoColorPicker.color.hexString = newHex;
    }
    this.setState(() => ({ pText }));
  };
  onColorPickerChange = (e) =>{
    var pText = demoColorPicker.color.hexString.toUpperCase();
    this.setState(() => ({ pText }));
    if(pText !== '#FFFFFF'){
      document.getElementById("color-val").style.color = pText;
    } else {
      document.getElementById("color-val").style.color = "black";
    }
    selectedElement.style.backgroundColor = pText;

    var that = this;
    demoColorPicker.on("color:change", function(color, changes) {
      // change p text on color change
      var pText = color.hexString.toUpperCase();
      that.setState(() => ({ pText }));
      if(pText !== '#FFFFFF'){
        document.getElementById("color-val").style.color = pText;
      } else {
        document.getElementById("color-val").style.color = "black";
      }
      selectedElement.style.backgroundColor = pText;
    });

  }
  setSelectedElement = (e) => {
    selectedElement.style.borderColor = '#E8E8E8';
    selectedElement = e.target;
    selectedElement.style.borderColor = "black";
    var pText = selectedElement.style.backgroundColor;
    pText = "#" + convertToRGB(pText).toUpperCase();
    this.setState(() => ({ pText }));
    if(pText !== '#FFFFFF'){
      document.getElementById("color-val").style.color = pText;
    } else {
      document.getElementById("color-val").style.color = "black";
    }
  }
  setColorBoxes = (generatedColors) => {
    var allBoxes = document.getElementsByClassName('color');
    var index = 0;
    for(var box of allBoxes){
      box.style.backgroundColor = generatedColors[index];
      index++;
    }
    console.log(allBoxes[0].style.backgroundColor);
  }

  colorRandomAPICall = () => {
    var seed = generateColorSeed();
    var mode = generateMode();
    var url = 'http://www.thecolorapi.com/scheme?hex=' + seed + '&format=json&mode='
              + mode + '&count=5';
    axios.get(url)
        .then(response => {
          var generatedColors = [];
          var resColors = response.data.colors;
          resColors.map((color) => {
            generatedColors.push(color.hex.value);
            console.log(color.hex.value);
          });
          this.setColorBoxes(generatedColors);
        }
        );

  }
  colorSchemeAPICall = (mode) => {
    var seed = generateColorSeed();
    var url = 'http://www.thecolorapi.com/scheme?hex=' + seed + '&format=json&mode='
              + mode + '&count=5';
    axios.get(url)
        .then(response => {
          var generatedColors = [];
          var resColors = response.data.colors;
          resColors.map((color) => {
            generatedColors.push(color.hex.value);
            console.log(color.hex.value);
          });
          this.setColorBoxes(generatedColors);
        }
        );

  }

  toggle() {
  this.setState({
    dropdownOpen: !this.state.dropdownOpen
  });
  }
  uploadHandler(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    //console.log(this.state.imagePreviewUrl);
    var img = document.getElementById('img');
    img.setAttribute('src', this.state.imagePreviewUrl);
    Vibrant.from(img.src).getPalette()
    .then((palette) => {
          var generatedColors = [];
          for (var swatch in palette){
            if (palette.hasOwnProperty(swatch) && palette[swatch]){
                console.log(swatch, palette[swatch].getHex());
                generatedColors.push(palette[swatch].getHex());
            }
          }
          this.setColorBoxes(generatedColors);


    });

    // img.addEventListener('load', function() {
    //     var vibrant = new Vibrant(img);
    //     console.log('vibrant', vibrant);
    //     var swatches = vibrant.swatches()
    //     console.log('swatches', swatches);
    //     for (var swatch in swatches)
    //         if (swatches.hasOwnProperty(swatch) && swatches[swatch])
    //             console.log(swatch, swatches[swatch].getHex())
    //
    //     /*
    //      * Results into:
    //      * Vibrant #7a4426
    //      * Muted #7b9eae
    //      * DarkVibrant #348945
    //      * DarkMuted #141414
    //      * LightVibrant #f3ccb4
    //      */
    // });
}

  fileChangedHandler(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        selectedFile: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }


  render(){
    return(
      <div id="wrapper">
        <img id="img" src="" style={{ display: 'none' }}/>
        <div id="top-wrapper">
          <div id="color-picker-container" onClick={this.onColorPickerChange}></div>
          <div id="options">
            <input type="text" id="color-val" value={this.state.pText} onChange={this.onColorValChange}></input>
              <button onClick={this.colorRandomAPICall}>randomize</button>
              <ButtonDropdown direction="right" isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}>
                <DropdownToggle caret>
                  Dropright
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.colorSchemeAPICall('monochrome')}>monochrome</DropdownItem>
                  <DropdownItem onClick={() => this.colorSchemeAPICall('analogic')}>analogic</DropdownItem>
                  <DropdownItem onClick={() => this.colorSchemeAPICall('complement')}>complement</DropdownItem>
                  <DropdownItem onClick={() => this.colorSchemeAPICall('analogic')}>analogic-complement</DropdownItem>
                  <DropdownItem onClick={() => this.colorSchemeAPICall('triad')}>triad</DropdownItem>
                  <DropdownItem onClick={() => this.colorSchemeAPICall('quad')}>quad</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <input type="file" onChange={this.fileChangedHandler}></input>
              <button onClick={this.uploadHandler}>upload image</button>
          </div>
        </div>
        <div id="bottom-wrapper">
          <div id="colors-wrapper">
            <div className="color color-1" id="first" style={{backgroundColor: "#FFFFFF" }} onClick={this.setSelectedElement}>
            </div>
            <div className="color color-2" style={{backgroundColor:"#FFFFFF"}} onClick={this.setSelectedElement}>
            </div>
            <div className="color color-3" style={{backgroundColor:"#FFFFFF"}} onClick={this.setSelectedElement}>
            </div>
            <div className="color color-4" style={{backgroundColor:"#FFFFFF"}} onClick={this.setSelectedElement}>
            </div>
            <div className="color color-5"style={{backgroundColor:"#FFFFFF"}} onClick={this.setSelectedElement}>
            </div>
          </div>
          <StoryForm
            onSubmit={this.onSubmit}
          />
        </div>

      </div>
    )
  }




}

// <DropdownItem onClick={this.colorSchemeAPICall('monochrome')}>monochrome</DropdownItem>
// <DropdownItem onClick={this.colorSchemeAPICall('analogic')}>analogic</DropdownItem>
// <DropdownItem onClick={this.colorSchemeAPICall('complement')}>complement</DropdownItem>
// <DropdownItem onClick={this.colorSchemeAPICall('analogic-complement')}>analogic-complement</DropdownItem>
// <DropdownItem onClick={this.colorSchemeAPICall('triad')}>triad</DropdownItem>
// <DropdownItem onClick={this.colorSchemeAPICall('quad')}>quad</DropdownItem>


const mapDispatchToProps = (dispatch) => ({
  startAddStory: (story) => dispatch(startAddStory(story))
});

export default connect(undefined, mapDispatchToProps)(AddStoryPage);
