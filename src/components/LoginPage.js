import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div className="heading">
      <h1 className="awesome">COLOR.LY</h1>
      <div className="buttons">
        <button onClick={startLogin} className="btn btn-1">LOGIN</button>
      </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

// <Link to="/dashboard">
//   <button className="btn btn-1">ENTER</button>
// </Link>
