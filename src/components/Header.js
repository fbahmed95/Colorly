import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <nav className="navbar navbar-expand-lg navbar-light">
      <div className="d-flex flex-grow-1">
          <span className="w-100 d-lg-none d-block"></span>
          <Link className="navbar-brand d-none d-lg-inline-block header__title" to="/dashboard">
              <h1 style={{fontSize:"60px"}}>COLOR.LY</h1>
          </Link>
          <div className="w-100 text-right">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
                  <span className="navbar-toggler-icon"></span>
              </button>
          </div>
      </div>
      <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
          <ul className="navbar-nav ml-auto flex-nowrap">
              <li className="nav-item">
                  <Link to="/create"><button className="header-button" >CREATE</button></Link>
              </li>
              <li className="nav-item">
                  <button className="header-button" >STORIES</button>
              </li>
              <li className="nav-item">
                  <button onClick={startLogout} className="header-button">LOGOUT</button>
              </li>
          </ul>
      </div>
  </nav>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);

// <header className="header">
//   <div className="header-container">
//     <div className="header__content">
//         <Link className="header__title" to="/dashboard">
//           <h1>COLOR.LY</h1>
//         </Link>
//       <div className="header-buttons">
//       <Link to="/create"><button className="header-button" >Create</button></Link>
//       <button className="header-button" >Stories</button>
//       <button className="header-button" onClick={startLogout}>Logout</button>
//       </div>
//     </div>
//   </div>
// </header>
