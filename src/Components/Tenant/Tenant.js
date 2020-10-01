import React from 'react'
import './tenant.css';

function Tenant(props) {
  return (
    <div className='tenant-container'>
      <div>
        Name
        <div className='name'>
          {props.tenantInfo.first_name} {props.tenantInfo.last_name}
        </div>
      </div>
      <div>
        Email
        <div>
          {props.tenantInfo.email}
        </div>
      </div>
      <div>
        Phone #
        <div>
          {props.tenantInfo.phone_num}
        </div>
      </div>

      <div>
        Subscriptions
        <div>
          {props.tenantInfo.is_email_subscribed}
          {props.tenantInfo.is_text_subscribed}
        </div>
      </div>

      <div>
        User Type
        <div>
          {props.tenantInfo.user_role}
        </div>
      </div>

      <div>
        Apartment #
        <div>
          {props.tenantInfo.apartment_num}
        </div>
      </div>

      <div>
        <button>Edit Info</button>
        <button>Delete Tenant</button>
      </div>
    </div>
  )
}

export default Tenant;