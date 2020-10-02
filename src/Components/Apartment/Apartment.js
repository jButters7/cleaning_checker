import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TenantCheck from '../TenantCheck/TenantCheck';

function Apartment(props) {

  const [apartmentCheckInfo, setApartmentCheckInfo] = useState([]);

  useEffect(() => {
    axios.get(`/api/tenant_reports/${props.monthId}/${props.apartmentId}`).then(res => {
      setApartmentCheckInfo(res.data);
    }, [])

  }, []);

  return (
    <div>
      {apartmentCheckInfo.map(tenantInfo => {
        console.log(tenantInfo)
        return (
          <div>
            <TenantCheck tenantInfo={tenantInfo} key={tenantInfo.tenant_id} />
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Apartment);