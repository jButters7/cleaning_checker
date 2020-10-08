import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TenantCheck from '../TenantCheck/TenantCheck';
import './apartment.css'

function Apartment(props) {

  const [apartmentCheckInfo, setApartmentCheckInfo] = useState([]);
  const [reRender, makeReRender] = useState(false);

  useEffect(() => {
    axios.get(`/api/tenant_reports/${props.monthId}/${props.apartmentId}`).then(res => {
      setApartmentCheckInfo(res.data);
    }, [])

  }, [reRender]);

  const runRender = () => {
    makeReRender(!reRender);
  }

  console.log(apartmentCheckInfo)

  return (

    <div className='apartment-container'>

      {/* {(apartmentCheckInfo[0] === undefined) ? */}
      {/* // <div className='tenant-list-component tenant-container input-label'>No tenants live here</div>
      // : */}

      { apartmentCheckInfo.map(tenantInfo => {
        console.log(tenantInfo)
        return (
          <div>
            <TenantCheck tenantInfo={tenantInfo} runRender={runRender} key={tenantInfo.tenant_id} />
          </div>
        )
      })
      }
    </div>
  )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Apartment);