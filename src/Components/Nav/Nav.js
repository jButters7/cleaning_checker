import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Nav(props) {
  return (

    <nav className='nav-container'>
      <nav>
        <Link className='link' to={{ pathname: '/admindashboard' }}>Dashboard</Link>
        <Link className='link' to={{ pathname: '/tenantlist' }}>Current Tenants</Link>
        <Link className='link' to={{ pathname: '/archive' }}>Archive</Link>

      </nav>
      <div>
        {props.userFirstName} {props.userLastName}
        <button className='nav-logout-button'>Logout</button>
      </div>
    </nav>

  )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Nav);