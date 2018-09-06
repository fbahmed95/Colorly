import React from 'react';
import ReactDOM from 'react-dom';

export default class StoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.story ? props.story.title : '',
      tags: props.story ? props.story.tags : [],
      colors: props.story ? props.story.colors : [],
      pText: props.story ? props.story.colors[0] : '#FFFFFF',
      error: '',
    };

  }
  onTitleChange = (e) => {
    // console.log(e.target.value);
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onTagsChange = (e) => {
    const tags = e.target.value.split(',');
    this.setState(() => ({ tags }));
  };
  saveColors = () => {
    var colorsClass = document.getElementsByClassName('color');
    var colors = [];
    for(var p of colorsClass){
      colors.push(p.style.backgroundColor);
    }
    this.setState(() => ({ colors }));

  }
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
        colors: this.state.colors,
        pText: this.state.colors[0]
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
              <button className="button" onClick={this.saveColors}>Save Color Story</button>
            </div>
          </form>
        </div>
    )
  }
}
