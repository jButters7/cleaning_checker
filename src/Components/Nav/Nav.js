import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='nav-bar'>
      <div className='nav-container'>
        <Link className='link' to={{ pathname: '/admindashboard' }}>Dashboard</Link>
        <Link className='link' to={{ pathname: '/tenantlist' }}>Current Tenants</Link>
        <Link className='link' to={{ pathname: '/archive' }}>Archive</Link>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Nav;