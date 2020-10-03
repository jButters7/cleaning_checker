import React, { useState } from 'react';
import './tenant.css';

function Tenant(props) {
  const { first_name, last_name, email, phone_num, is_email_subscribed, is_text_subscribed, user_role, apartment_num } = props.tenantInfo

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [givenEmail, setGivenEmail] = useState(email);
  const [phoneNum, setPhoneNum] = useState(phone_num);
  const [isEmailSub, setIsEmailSub] = useState(is_email_subscribed);
  const [isTextSub, setIsTextSub] = useState(is_text_subscribed);
  const [userRole, setUserRole] = useState(user_role);
  const [apartmentNum, setApartmentNum] = useState(apartment_num);

  return (

    <div>
      {isEditing ?
        <div className='tenant-container'>
          {/* This is the edit container */}
          <div>
            Name
        <div className='name'>
              <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} />
              <input type='text' value={lastName} />
            </div>
          </div>
          <div>
            Email
        <div>
              <input type='text' value={givenEmail} />
            </div>
          </div>
          <div>
            Phone #
        <div>
              <input type='text' value={phoneNum} />
            </div>
          </div>

          <div>
            Subscriptions
        <div>
              <input type='text' value={isEmailSub} />
              <input type='text' value={isTextSub} />
            </div>
          </div>

          <div>
            User Type
        <div>
              <input type='text' value={userRole} />
            </div>
          </div>

          <div>
            Apartment #
        <div>

              <input type='text' value={apartmentNum} />
            </div>
          </div>

          <div>
            <button onClick={() => setIsEditing(!isEditing)}>Save Edit</button>
            <button>Delete Tenant</button>
          </div>
        </div>

        :

        <div className='tenant-container'>
          <div>
            Name
      <div className='name'>
              {first_name} {last_name}
            </div>
          </div>
          <div>
            Email
      <div>
              {email}
            </div>
          </div>
          <div>
            Phone #
      <div>
              {phone_num}
            </div>
          </div>

          <div>
            Subscriptions
      <div>
              {is_email_subscribed}
              {is_text_subscribed}
            </div>
          </div>

          <div>
            User Type
      <div>
              {user_role}
            </div>
          </div>

          <div>
            Apartment #
      <div>
              {apartment_num}
            </div>
          </div>

          <div>
            <button onClick={() => setIsEditing(!isEditing)}>Edit Info</button>
            <button>Delete Tenant</button>
          </div>
        </div>}
    </div>
  )
}

export default Tenant;