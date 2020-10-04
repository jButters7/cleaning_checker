import React, { useState } from 'react';
import axios from 'axios';
import './tenant.css';

function Tenant(props) {
  const { tenant_id, user_id, first_name, last_name, email, phone_num, is_email_subscribed, is_text_subscribed, user_role, apartment_num } = props.tenantInfo

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [givenEmail, setGivenEmail] = useState(email);
  const [phoneNum, setPhoneNum] = useState(phone_num);
  const [isEmailSub, setIsEmailSub] = useState(is_email_subscribed);
  const [isTextSub, setIsTextSub] = useState(is_text_subscribed);
  const [userRole, setUserRole] = useState(user_role);
  const [apartmentNum, setApartmentNum] = useState(apartment_num);


  const sendNewUserInformation = () => {
    console.log('sendUser')
    axios.put(`/api/user/${user_id}`, { firstName, lastName, givenEmail, phoneNum, isEmailSub, isTextSub, userRole, apartmentNum, tenant_id }).then(res => {
      console.log(res.data)
      setIsEditing(!isEditing);
      props.getTenants();
    }).catch(err => alert(err.message));
  }





  return (

    <div>
      {isEditing ?
        <div className='tenant-container'>
          {/* This is the edit container */}
          <div>
            Name
        <div className='name'>
              <input type='text' value={firstName} placeholder='First Name' onChange={e => setFirstName(e.target.value)} />
              <input type='text' value={lastName} placeholder='Last Name' onChange={e => setLastName(e.target.value)} />
            </div>
          </div>
          <div>
            Email
        <div>
              <input type='text' value={givenEmail} onChange={e => setGivenEmail(e.target.value)} />
            </div>
          </div>
          <div>
            Phone #
        <div>
              <input type='text' value={phoneNum} onChange={e => setPhoneNum(e.target.value)} />
            </div>
          </div>

          <div>
            Notifications
        <div>
              {(isEmailSub === "TRUE") ?
                <div>
                  <label>Email: </label>
                 Yes<input type='radio' value="true" name='email' onClick={() => setIsEmailSub('TRUE')} checked />
                 No<input type='radio' value="false" name='email' onClick={() => setIsEmailSub('FALSE')} />
                </div> :
                <div>
                  <label>Email: </label>
                  Yes<input type='radio' value="true" name='email' onClick={() => setIsEmailSub('TRUE')} />
                  No <input type='radio' value="false" name='email' onClick={() => setIsEmailSub('FALSE')} checked />
                </div>
              }
              {(isTextSub === "TRUE") ?
                <div>
                  <label>Text: </label>
                  Yes<input type='radio' value="true" name='text' onClick={() => setIsTextSub('TRUE')} checked />
                 No<input type='radio' value="false" name='text' onClick={() => setIsTextSub('FALSE')} />
                </div> :
                <div>
                  <label>Text: </label>
                  Yes<input type='radio' value="true" name='text' onClick={() => setIsTextSub('TRUE')} />
                  No<input type='radio' value="false" name='text' onClick={() => setIsTextSub('FALSE')} checked />
                </div>
              }
            </div>
          </div>

          <div>
            User Type
        <div>
              {(userRole === "TENANT") ?
                <div>
                  Tenant
                  <input type='radio' name={tenant_id} value='TENANT' onClick={() => setUserRole('TENANT')} checked />
                  Admin
                  <input type='radio' name={tenant_id} value='ADMIN' onClick={() => setUserRole('ADMIN')} />
                </div>
                :
                <div>
                  Tenant
                  <input type='radio' name={tenant_id} value='TENANT' onClick={() => setUserRole('TENANT')} />
                  Admin
                  <input type='radio' name={tenant_id} value='ADMIN' onClick={() => setUserRole('ADMIN')} checked />
                </div>
              }
            </div>
          </div>

          <div>
            Apartment #
        <div>

              <input type='text' value={apartmentNum} onChange={e => setApartmentNum(e.target.value)} />
            </div>
          </div>

          <div>
            <button onClick={() => sendNewUserInformation()}>Save</button>
            <button onClick={() => setIsEditing(!isEditing)}>Cancel</button>
            <button>Delete Tenant</button>
          </div>
        </div>

        :

        // -------------------------------- RENDERED DISPLAYED ------------------------
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
            Notifications
      <div>
              {is_email_subscribed ? <div>Email &#9745;</div> : <div>Email &#9744;</div>}
              {is_text_subscribed ? <div>Text &#9745;</div> : <div>Text &#9744;</div>}
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