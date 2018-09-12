import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div className="login-background">
       <div className='box'>
         <div className='wave -one'></div>
         <div className='wave -two'></div>
         <div className='wave -three'></div>
         <div className='title'>
           <p>COLOR.LY</p>
           <button onClick={startLogin} className="btn btn-lg">LOGIN</button>
         </div>
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
