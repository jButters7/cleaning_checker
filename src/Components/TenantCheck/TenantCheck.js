import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

function TenantCheck(props) {

  const [checkStatus, alterCheckStatus] = useState(props.tenantInfo.status)
  const [failedInfo, setFailedInfo] = useState(props.tenantInfo.failed_info)


  const submitTenantCleaningCheck = (props) => {
    axios.put(`/api/check_report/${props.tenantInfo.tenant_report_id}`, { checkStatus, failedInfo }).then(res => {
      console.log(res.data);
      props.runRender();
    })
  }



  return (
    <div>
      {props.tenantInfo.first_name} {props.tenantInfo.last_name}
      <div className='pass-checkbox'>
        {(checkStatus) === "PASS" ?
          <div>
            <label name={props.tenantInfo.tenant_report_id}>PASS</label>
            <input type="radio" name={props.tenantInfo.tenant_report_id} value='PASS' onClick={() => alterCheckStatus('PASS')} checked />
          </div>
          :
          <div>
            <label name={props.tenantInfo.tenant_report_id}>PASS</label>
            <input type="radio" name={props.tenantInfo.tenant_report_id} value='PASS' onClick={() => alterCheckStatus('PASS')} />
          </div>}
      </div>

      <div className='fail-checkbox'>
        {(checkStatus) === "FAIL" ?
          <div>
            <label name={props.tenantInfo.tenant_report_id}>FAIL</label>
            <input type="radio" name={props.tenantInfo.tenant_report_id} value='FAIL' onClick={() => alterCheckStatus('FAIL')} checked />
          </div>
          :
          <div>
            <label name={props.tenantInfo.tenant_report_id}>FAIL</label>
            <input type="radio" name={props.tenantInfo.tenant_report_id} value='FAIL' onClick={() => alterCheckStatus('FAIL')} />
          </div>
        }
      </div>
      {(checkStatus === "FAIL") ?
        <textarea name='failedInfo' value={props.tenantInfo.failed_info} cols='40' rows='7' placeholder='Input reasons for failure' onChange={(e) => setFailedInfo(e.target.value)} /> :
        null}

      {(props.tenantInfo.status === "INITIAL") ?
        <button onClick={() => submitTenantCleaningCheck(props)}>Submit</button> :
        <button onClick={() => submitTenantCleaningCheck(props)}>Resubmit</button>
      }
    </div>

  )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(TenantCheck);