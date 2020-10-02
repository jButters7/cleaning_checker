import React from 'react';
import moment from 'moment';


function TenantReport(props) {



  return (
    <div>
      <div>
        {moment(props.cleaningReport.check_month).format('MMMM YYYY')}
      </div>
      <div>
        {props.cleaningReport.status}
      </div>
      <div>
        {(props.cleaningReport.status === 'FAIL') ?
          <div>{props.cleaningReport.failed_info}</div> :
          null}
      </div>
    </div>
  )
}

export default TenantReport;