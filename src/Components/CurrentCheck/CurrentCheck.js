import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setReduxApartmentId } from '../../ducks/reducer';
import { connect } from 'react-redux';
import './currentcheck.css'


function CurrentCheck(props) {
  const [apartmentsArray, setApartmentsArray] = useState([]);

  useEffect(() => {
    // axios.get('/auth/me').then(res => {
    //   console.log(res.data.noUser)
    //   if (res.data.currentUser.status === "TENANT") {
    //     console.log('made it')
    //     props.history.push('/dashboard')
    //   }
    // }).catch(() => props.history.push('/dashboard'));
    getAllApartments();
  }, []);

  const getAllApartments = () => {
    //Gets all apartments form the db
    axios.get('/api/check/').then(res => {
      setApartmentsArray(res.data)
    })
  }

  const sendReduxApartmentId = (apartmentId) => {
    props.setReduxApartmentId(apartmentId)

  }


  return (
    <div className='current-check-container'>
      {apartmentsArray.map(apartment => {
        let apartmentId = apartment.apartment_id;

        function sendApartmentIdOutOfMap() {
          return sendReduxApartmentId(apartmentId);
        }

        return (
          <div className='apartment-number-link-container'>
            <Link to={{ pathname: `/apartment` }} className='apartment-link' onClick={() => sendApartmentIdOutOfMap()}>
              <div className='apartment-number'>
                {apartment.apartment_num}
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, { setReduxApartmentId })(CurrentCheck);