import React from 'react';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.story ? props.expense.title : '',
      tags: props.story ? props.expense.tags : [],
      colors: props.story ? props.expense.colors : [],
      error: ''
    };
  }
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onTagsChange = (e) => {
    const tags = e.target.value.split(',');
    this.setState(() => ({ tags }));
  };
  onColorsChange = (e) => {
    const colors = e.target.value.split(',');
    this.setState(() => ({ colors }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.title || !this.state.colors) {
      this.setState(() => ({ error: 'Please provide title and colors.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        title: this.state.title,
        tags: this.state.tags,
        colors: this.state.colors
      });
    }
  };
  render() {
    return (
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
          placeholder="colors, separated by commas"
          className="text-input"
          value={this.state.colors}
          onChange={this.onColorsChange}
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
    )
  }
}
