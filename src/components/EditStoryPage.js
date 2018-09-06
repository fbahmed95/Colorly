import React from 'react';
import { connect } from 'react-redux';
import StoryForm from './StoryForm';
import { startEditStory, startRemoveStory} from '../actions/stories';
import { convertToRGB } from '../selectors/convertToRGB'
 // import iro from "@jaames/iro";

var demoColorPicker;
var selectedElement;

export class EditStoryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pText: props.story ? "#" + convertToRGB(props.story.pText).toUpperCase() : '#FFFFFF'
    };
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

      // selectedElement.style.backgroundColor = hexString;
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
            <button>randomize</button>
            <button>scheme</button>
            <button>upload image</button>
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
