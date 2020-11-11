import React, { useState } from 'react';
import axios from 'axios';

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

  const deleteUser = () => {
    axios.delete(`/api/user/${user_id}`).then(res => {
      console.log(res.data);
      console.log(props);
      props.getTenants();
    })
  }

  return (
    <div>
      {isEditing ?
        <div className='tenant-container'>
          {/* This is the edit container */}
          <div>
            Name
        <div className='name'>
              <input className='update-inputs name-input' type='text' value={firstName} placeholder='First Name' onChange={e => setFirstName(e.target.value)} />
              <input className='update-inputs name-input' type='text' value={lastName} placeholder='Last Name' onChange={e => setLastName(e.target.value)} />
            </div>
          </div>
          <div>
            Email
        <div>
              <input className='update-inputs email-input' type='text' value={givenEmail} onChange={e => setGivenEmail(e.target.value)} />
            </div>
          </div>
          <div>
            Phone #
        <div>
              <input className='update-inputs phone-input' type='text' value={phoneNum} onChange={e => setPhoneNum(e.target.value)} />
            </div>
          </div>

          <div>
            Notifications
        <div>
              {(isEmailSub === "TRUE") ?
                <div>
                  <label className='input-label' >Email: </label>
                 Yes<input className='update-inputs' type='radio' value="true" name='email' onClick={() => setIsEmailSub('TRUE')} checked />
                 No<input type='radio' value="false" name='email' onClick={() => setIsEmailSub('FALSE')} />
                </div> :
                <div>
                  <label className='input-label'>Email: </label>
                  Yes<input className='update-inputs' type='radio' value="true" name='email' onClick={() => setIsEmailSub('TRUE')} />
                  No <input type='radio' value="false" name='email' onClick={() => setIsEmailSub('FALSE')} checked />
                </div>
              }
              {(isTextSub === "TRUE") ?
                <div>
                  <label className='input-label' >Text: </label>
                  Yes<input className='update-inputs' type='radio' value="true" name='text' onClick={() => setIsTextSub('TRUE')} checked />
                 No<input type='radio' value="false" name='text' onClick={() => setIsTextSub('FALSE')} />
                </div> :
                <div>
                  <label className='input-label' >Text: </label>
                  Yes<input className='update-inputs' type='radio' value="true" name='text' onClick={() => setIsTextSub('TRUE')} />
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
                  <input className='update-inputs' type='radio' name={tenant_id} value='TENANT' onClick={() => setUserRole('TENANT')} checked />
                  Admin
                  <input className='update-inputs' type='radio' name={tenant_id} value='ADMIN' onClick={() => setUserRole('ADMIN')} />
                </div>
                :
                <div>
                  Tenant
                  <input className='update-inputs' type='radio' name={tenant_id} value='TENANT' onClick={() => setUserRole('TENANT')} />
                  Admin
                  <input className='update-inputs' type='radio' name={tenant_id} value='ADMIN' onClick={() => setUserRole('ADMIN')} checked />
                </div>
              }
            </div>
          </div>

          <div>
            Apartment #
        <div>

              <input className='apartment-input update-inputs' type='number' value={apartmentNum} onChange={e => setApartmentNum(e.target.value)} />
            </div>
          </div>

          <div className='edit-buttons-container'>
            <div>
              <button className='update-user-btns' onClick={() => sendNewUserInformation()}>Save</button>
              <button className='update-user-btns' onClick={() => setIsEditing(!isEditing)}>Cancel</button>
            </div>
            <div>
              <button className='update-user-btns' onClick={() => deleteUser()}>Delete</button>
            </div>
          </div>
        </div>

        :

        // -------------------------------- RENDERED DISPLAYED ------------------------
        <div className='tenant-container'>
          <div>
            <h4 className='column-title'>Name</h4>
            <div className='name'>
              {first_name} {last_name}
            </div>
          </div>
          <div>
            <h4 className='column-title'>Email</h4>
            <div>
              {email}
            </div>
          </div>
          <div>
            <h4 className='column-title'>Phone #</h4>
            <div>
              {phone_num}
            </div>
          </div>

          <div>
            <h4 className='column-title'>Notifications</h4>
            <div>
              {is_email_subscribed ? <div>Email &#9745;</div> : <div>Email &#9744;</div>}
              {is_text_subscribed ? <div>Text &#9745;</div> : <div>Text &#9744;</div>}
            </div>
          </div>

          <div>
            <h4 className='column-title'>User Type</h4>
            <div>
              {user_role}
            </div>
          </div>

          <div>
            <h4 className='column-title'>Apartment #</h4>
            <div>
              {apartment_num}
            </div>
          </div>

          <div>
            <button className='update-user-btns' onClick={() => setIsEditing(!isEditing)}>Edit Info</button>
          </div>
        </div>}
    </div>
  )
}

export default Tenant;