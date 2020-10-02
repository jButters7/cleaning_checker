import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function TenantCheck(props) {

  const [checkStatus, alterCheckStatus] = useState(props.tenantInfo.status)
  const [failedInfo, setFailedInfo] = useState(props.tenantInfo.failed_info)

  const submitTenantCleaningCheck = () => {
    axios.put(`/api/check_report/${props.tenantInfo.tenant_report_id}`, { checkStatus, failedInfo }).then(res => {
      console.log(res.data);
    })
  }

  return (
    <div>
      {props.tenantInfo.first_name} {props.tenantInfo.last_name}
      <div className='pass-checkbox'>
        {(checkStatus) === "PASS" ?
          <input type="radio" name={props.tenantInfo.tenant_report_id} value='PASS' onClick={() => alterCheckStatus('PASS')} checked /> :
          <input type="radio" name={props.tenantInfo.tenant_report_id} value='PASS' onClick={() => alterCheckStatus('PASS')} />}
      </div>

      <div className='fail-checkbox'>
        {(checkStatus) === "FAIL" ?
          <input type="radio" name={props.tenantInfo.tenant_report_id} value='FAIL' onClick={() => alterCheckStatus('FAIL')} checked /> :
          <input type="radio" name={props.tenantInfo.tenant_report_id} value='FAIL' onClick={() => alterCheckStatus('FAIL')} />
        }
      </div>

      {(checkStatus === "FAIL") ?
        <textarea name='failedInfo' value={props.tenantInfo.failed_info} cols='40' rows='7' placeholder='Input reasons for failure' onChange={(e) => setFailedInfo(e.target.value)} /> :
        null}
      <button onClick={() => submitTenantCleaningCheck()}>Submit</button>
    </div>

  )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(TenantCheck);