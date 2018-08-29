import React from 'react';
import { connect } from 'react-redux';
import StoryForm from './StoryForm';
import { startAddStory } from '../actions/stories';

export class AddStoryPage extends React.Component {
  onSubmit = (story) => {
    this.props.startAddStory(story);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Story</h1>
          </div>
        </div>
        <div className="content-container">
          <StoryForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddStory: (story) => dispatch(startAddStory(story))
});

export default connect(undefined, mapDispatchToProps)(AddStoryPage);
