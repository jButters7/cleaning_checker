import React, { useEffect } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser, loginUser } from '../../ducks/reducer';
import axios from 'axios';

function Nav(props) {

  useEffect(() => {
    axios.get('/auth/me').then(res => {
      console.log(props);
      props.loginUser(res.data.user_id, res.data.first_name, res.data.last_name, res.data.user_role)
    })
  })

  const logout = () => {
    axios.delete('/auth/logout').then(() => {
      props.logoutUser();
    }).catch(err => alert('Something went wrong.', err))
  }

  return (
    <div>
      {(props.userId === null) ? null :

        (props.userType === "ADMIN") ?

          <nav className='nav-container'>
            <nav className='all-nav-links'>
              <Link className='link' to={{ pathname: '/admindashboard' }}>Dashboard</Link>
              <Link className='link' to={{ pathname: '/tenantlist' }}>Current Tenants</Link>
              <Link className='link' to={{ pathname: '/archive' }}>Archive</Link>

            </nav>
            <div>
              {props.userFirstName} {props.userLastName}
              <Link to={{ pathname: '/' }} className='nav-logout-button' onClick={() => logout()} >Logout</Link>
            </div>
          </nav> :

          <nav className='nav-container tenant-nav-container'>

            <div>
              {props.userFirstName} {props.userLastName}
              <Link to={{ pathname: '/' }} className='nav-logout-button' onClick={() => logout()} >Logout</Link>
            </div>
          </nav>

      }

    </div>

  )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { logoutUser, loginUser })(Nav);