import React from 'react';
import moment from 'moment';


function TenantReport(props) {

  return (
    <div className='tenant-contents'>
      <div className='month-and-status'>
        <div className='report-month'>
          <h4>
            {moment(props.cleaningReport.check_month).format('MMMM YYYY')}
          </h4>
        </div>
        <div className='check-status'>
          {(props.cleaningReport.status === 'INITIAL') ? <div>Currently Out Checking</div> :
            props.cleaningReport.status}

        </div>
      </div>
      <div >
        {(props.cleaningReport.status === 'FAIL') ?
          <div className='failed-info-display'>{props.cleaningReport.failed_info}</div> :
          null}
      </div>
    </div>
  )
}

export default TenantReport;