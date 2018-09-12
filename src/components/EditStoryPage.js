import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import StoryForm from './StoryForm';
import { startEditStory, startRemoveStory} from '../actions/stories';
import { convertToRGB } from '../selectors/convertToRGB';
import { generateColorSeed, generateMode } from '../selectors/generateColorSeed';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import * as Vibrant from 'node-vibrant'

var demoColorPicker;
var selectedElement;

export class EditStoryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pText: props.story ? "#" + convertToRGB(props.story.pText).toUpperCase() : '#FFFFFF',
      dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.colorRandomAPICall = this.colorRandomAPICall.bind(this);
    this.colorSchemeAPICall = this.colorSchemeAPICall.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);

  };
  onSubmit = (story) => {
    this.props.startEditStory(this.props.story.id, story);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemoveStory({ id: this.props.story.id });
    this.props.history.push('/');
  };
  componentDidMount = () => {
    demoColorPicker = new window.iro.ColorPicker("#color-picker", {
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


  // render(
  render(){
    return(
      <div id="wrapper">
        <div id="top-wrapper">
          <div id="color-picker" onClick={this.onColorPickerChange}></div>
          <div id="options">
            <input type="text"
                  id="color-val"
                  value={this.state.pText}
                  onChange={this.onColorValChange}
                  style={{color: this.props.story.pText}}
                  ></input>
                  <button onClick={this.colorRandomAPICall} className="create-btn">randomize</button>
                  <ButtonDropdown className="create-btn" direction="right" isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }}>
                    <DropdownToggle caret className="my-create-btn" style={{ width: '100%' }}>
                      scheme
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
                  <button onClick={this.uploadHandler} className="create-btn">upload image</button>
          </div>
        </div>
        <div id="bottom-wrapper">
          <div id="colors-wrapper">
            <div className="color color-1" id="first" style={{backgroundColor: this.props.story.colors[0]}} onClick={this.setSelectedElement}>
            </div>
            <div className="color color-2" style={{backgroundColor: this.props.story.colors[1]}} onClick={this.setSelectedElement}>
            </div>
            <div className="color color-3" style={{backgroundColor: this.props.story.colors[2]}} onClick={this.setSelectedElement}>
            </div>
            <div className="color color-4" style={{backgroundColor: this.props.story.colors[3]}} onClick={this.setSelectedElement}>
            </div>
            <div className="color color-5"style={{backgroundColor: this.props.story.colors[4]}} onClick={this.setSelectedElement}>
            </div>
          </div>
          <StoryForm
            story={this.props.story}
            onSubmit={this.onSubmit}
          />
        </div>
        <button className="button button--secondary" onClick={this.onRemove}>Remove Story</button>
      </div>
    )
  }

};

const mapStateToProps = (state, props) => ({
  story: state.stories.find((story) => story.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditStory: (id, story) => dispatch(startEditStory(id, story)),
  startRemoveStory: (data) => dispatch(startRemoveStory(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditStoryPage);
