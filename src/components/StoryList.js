import React from 'react';
import { connect } from 'react-redux';
import StoryListItem from './StoryListItem';
import selectStories from '../selectors/stories';


export const StoryList = (props) => (
  <div className="content-container">
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


// export const StoryList = (props) => (
//   <div className="content-container">
//     <div className="list-body">
//       {
//         props.stories.length === 0 ? (
//           <div className="list-item list-item--message">
//             <span>No Stories</span>
//           </div>
//         ) : (
//             props.stories.map((story) => {
//               return <StoryListItem key={story.id} {...story} />;
//             })
//           )
//       }
//     </div>
//   </div>
// );

const mapStateToProps = (state) => {
  return {
    stories: selectStories(state.stories)
  };
};

export default connect(mapStateToProps)(StoryList);
