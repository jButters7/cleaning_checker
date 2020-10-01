import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function Apartment(props) {

  const [apartmentCheckInfo, setApartmentCheckInfo] = useState([]);

  useEffect(() => {
    getTenantReports();
  }, []);

  const getTenantReports = () => {
    axios.get(`/api/tenant_reports/${props.monthId}/${props.apartmentId}`).then(res => {
      console.log(res.data);
    })
  }


  return (
    <div>
      Apartment purchasing
    </div>
  )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Apartment);