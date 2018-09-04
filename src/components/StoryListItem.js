import React from 'react';
import { Link } from 'react-router-dom';

// const StoryListItem = ({ id, title, tags, colors}) => (
//   <Link className="list-item" to={'/edit/' + id}>
//     <div>
//       <h3 className="list-item__title">{title}</h3>
//     </div>
//     <h3 className="list-item__data">{tags}</h3>
//     <h3 className="list-item__data">{colors}</h3>
//   </Link>
// );
const StoryListItem = ({ id, title, tags, colors}) => (
  <div>
    <div>
      <h3 className="list-item__title">{title}</h3>
    </div>
    <h3 className="list-item__data">{tags}</h3>
    <h3 className="list-item__data">{colors}</h3>
  </div>
);
export default StoryListItem;
