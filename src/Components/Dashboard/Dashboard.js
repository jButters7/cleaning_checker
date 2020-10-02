import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TenantReport from '../TenantReport/TenantReport';

function Dashboard(props) {

  const [cleaningCheckHistory, setCleaningCheckHistory] = useState([]);

  useEffect(() => {
    axios.get(`/api/check/${props.userId}`).then(res => {
      setCleaningCheckHistory(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <div>
      {cleaningCheckHistory.map(cleaningReport => {
        return (
          <div>
            <TenantReport cleaningReport={cleaningReport} />
          </div>
        )
      })}
    </div>
  )
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Dashboard);