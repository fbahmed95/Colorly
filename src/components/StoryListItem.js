import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StoryListItem = ({ id, title, tags, colors}) => (
  <div className="card">
    <div className="card-colors">
      <div className="color color-1" style={{backgroundColor: colors[0] }}>
      </div>
      <div className="color color-2" style={{backgroundColor: colors[1] }}>
      </div>
      <div className="color color-3" style={{backgroundColor: colors[2] }}>
      </div>
      <div className="color color-4" style={{backgroundColor: colors[3] }}>
      </div>
      <div className="color color-5" style={{backgroundColor: colors[4] }}>
      </div>
    </div>
    <div className="card-description">
      <div className="card-title">
        <Link to={'/edit/' + id}><p>{title.toUpperCase()}</p></Link>
      </div>
      <div className="card-bottom">
        <p><FontAwesomeIcon icon="heart" /> 350 </p>
      </div>
    </div>
  </div>
);

export default StoryListItem;
