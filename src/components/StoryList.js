import React from 'react';
import { connect } from 'react-redux';
import StoryListItem from './StoryListItem';
import selectStories from '../selectors/stories';


export const StoryList = (props) => (
  <div className="story-list-container">
      {
        props.stories.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No Stories</span>
          </div>
        ) : (
            props.stories.map((story) => {
              return <StoryListItem key={story.id} {...story} />;
            })
          )
      }
  </div>
);

const mapStateToProps = (state) => {
  return {
    stories: selectStories(state.stories, state.filters)
  };
};


export default connect(mapStateToProps)(StoryList);
