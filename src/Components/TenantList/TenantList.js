import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tenant from '../Tenant/Tenant';
import './tenantlist.css';


function TenantList() {

  const [tenantArray, setTenantArray] = useState([]);

  useEffect(() => {
    getTenants();
  }, []);

  const getTenants = () => {
    axios.get('/api/users').then(res => {
      setTenantArray(res.data);
    })
  };


  return (
    <div className='tenant-list-component'>
      {tenantArray.map(tenant => {
        return <Tenant key={tenant.tenant_id} tenantInfo={tenant} getTenants={getTenants} />
      })}

    </div>
  )
}

export default TenantList;