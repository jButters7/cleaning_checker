import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TenantReport from '../TenantReport/TenantReport';

function Dashboard(props) {

  const [cleaningCheckHistory, setCleaningCheckHistory] = useState([]);
  const [upcomingCheckDates, setUpcomingCheckDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/check/${props.userId}`).then(res => {
      console.log(res.data);
      axios.get('/api/check_date').then(dateInfo => {
        setCleaningCheckHistory(res.data)
        setUpcomingCheckDates(dateInfo.data)
        setIsLoading(false)
      })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return isLoading ? <p>loading...</p> : (
    <div>
      {console.log(upcomingCheckDates[0])}
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