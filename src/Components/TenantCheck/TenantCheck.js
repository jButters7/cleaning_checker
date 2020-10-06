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
    <div className='tenant-containers'>

      <div className='tenant-input-container'>
        <h4 className='tenant-name'>
          {props.tenantInfo.first_name} {props.tenantInfo.last_name}
        </h4>

        <div className='radio-buttons'>
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
        </div>
        {(props.tenantInfo.status === "INITIAL") ?
          <button className='submit-report-btn' onClick={() => submitTenantCleaningCheck(props)}>Submit</button> :
          <button className='submit-report-btn' onClick={() => submitTenantCleaningCheck(props)}>Resubmit</button>
        }
      </div>
      {(checkStatus === "FAIL") ?
        <textarea name='failedInfo' className='fail-input-box' value={props.tenantInfo.failed_info} cols='40' rows='5' placeholder='Input reasons for failure' onChange={(e) => setFailedInfo(e.target.value)} /> :
        null}
    </div>
  )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(TenantCheck);