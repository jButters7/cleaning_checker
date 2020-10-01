import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setReduxApartmentId } from '../../ducks/reducer';
import { connect } from 'react-redux';


function CurrentCheck(props) {
  const [apartmentsArray, setApartmentsArray] = useState([]);

  useEffect(() => {
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
    <div>
      {apartmentsArray.map(apartment => {
        let apartmentId = apartment.apartment_id;

        function sendApartmentIdOutOfMap() {
          return sendReduxApartmentId(apartmentId);
        }

        return (
          <Link to={{ pathname: `/apartment` }} onClick={() => sendApartmentIdOutOfMap()}>
            <div>
              {apartment.apartment_num}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, { setReduxApartmentId })(CurrentCheck);