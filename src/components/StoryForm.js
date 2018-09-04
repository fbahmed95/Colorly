import React from 'react';
import ReactDOM from 'react-dom';

export default class StoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.story ? props.story.title : '',
      tags: props.story ? props.story.tags : [],
      colors: props.story ? props.story.colors : [],
      error: '',
    };

  }
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
    var colorsClass = document.getElementsByClassName('color');
    var colors = [];
    for(var p of colorsClass){
      colors.push(p.style.backgroundColor);
    }
    this.setState(() => ({ colors }));
  };
  onTagsChange = (e) => {
    const tags = e.target.value.split(',');
    this.setState(() => ({ tags }));
  };
  // onColorsChange = (e) => {
  //   const colors = e.target.value.split(',');
  //   this.setState(() => ({ colors }));
  // };

  onSubmit = (e) => {
    e.preventDefault();
    // if (!this.state.title || !this.state.colors) {
    //   this.setState(() => ({ error: 'Please provide title and colors.' }));
    // } else {
    //   this.setState(() => ({ error: '' }));

      this.props.onSubmit({
        title: this.state.title,
        tags: this.state.tags,
        colors: this.state.colors
      });
    // }
  };
  render() {
    return (
        <div id="description">
          <form className="form" onSubmit={this.onSubmit}>
            {this.state.error && <p className="form__error">{this.state.error}</p>}
            <input
              type="text"
              placeholder="title"
              autoFocus
              className="text-input"
              value={this.state.title}
              onChange={this.onTitleChange}
            />

            <input
              type="text"
              placeholder="tags, separated by commas"
              className="text-input"
              value={this.state.tags}
              onChange={this.onTagsChange}
            />
            <div>
              <button className="button">Save Color Story</button>
            </div>
          </form>
        </div>
    )
    // return(
    //   <div className="bottom-wrapper">
    //     <div className="colors-wrapper">
    //       <div className="color color-1 first" onClick="setSelect(this)">
    //       </div>
    //       <div className="color color-2" onClick="setSelect(this)">
    //       </div>
    //       <div className="color color-3" onClick="setSelect(this)">
    //       </div>
    //       <div className="color color-4" onClick="setSelect(this)">
    //       </div>
    //       <div className="color color-5" onClick="setSelect(this)">
    //       </div>
    //     </div>
    //     <div id="description">
    //       <form onSubmit={this.onSubmit}>
    //         <input type="text" value="TITLE GOES HERE" id="title-input" value={this.state.title} onChange={this.onTitleChange}></input>
    //         <input type="text" placeholder="separate tags by commas" id="tags-input" value={this.state.tags} onChange={this.onTagsChange}></input>
    //         // <input type="text" id="colors-input" value={this.state.colors} onChange={this.onColorsChange}></input>
    //         <button id="submit">save</button>
    //       </form>
    //     </div>
    //   </div>
    // )
  }
}

//
// <div id="bottom-wrapper">
//   <div id="colors-wrapper">
//     <div class="color color-1" id="first" onclick="setSelect(this)">
//     </div>
//     <div class="color color-2" onclick="setSelect(this)">
//     </div>
//     <div class="color color-3" onclick="setSelect(this)">
//     </div>
//     <div class="color color-4" onclick="setSelect(this)">
//     </div>
//     <div class="color color-5" onclick="setSelect(this)">
//     </div>
//   </div>
//   <div id="description">
//     <form>
//       <input type="text" value="TITLE GOES HERE" id="title-input"></input>
//       <input type="text" placeholder="separate tags by commas" id="tags-input"></input>
//       <button id="submit">save</button>
//     </form>
//   </div>
// </div>
