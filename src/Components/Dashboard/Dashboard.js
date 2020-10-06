import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TenantReport from '../TenantReport/TenantReport';
import moment from 'moment';
import './dashboard.css';

function Dashboard(props) {

  const [cleaningCheckHistory, setCleaningCheckHistory] = useState([]);
  const [upcomingCheckDates, setUpcomingCheckDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/check/${props.userId}`).then(res => {
      axios.get('/api/check_date').then(dateInfo => {
        setCleaningCheckHistory(res.data);
        setUpcomingCheckDates(dateInfo.data);
        setIsLoading(false);
      })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('cch', cleaningCheckHistory)

  return isLoading ?
    <div className='not-logged-in-view'>
      <h1>You Must Log In <br />To View The Dashboard</h1>
    </div> : (
      <div>
        <div>

          {(upcomingCheckDates[0] === undefined) ?
            <h3>No Cleaning Check Scheduled</h3> :
            <h3>Upcoming Cleaning Check On: {moment(upcomingCheckDates[0].check_date).format('MMMM Do YYYY')}
            </h3>}
        </div>

        {(cleaningCheckHistory[0] === undefined) ?
          <div>
            <h2>No Cleaning Check History to Display</h2>
            <h3>Please Check Back Later</h3>
          </div>
          :

          <div className='encompassing-tenant-component'>
            {cleaningCheckHistory.map(cleaningReport => {
              return (
                <div className='tenant-report-component'>
                  <TenantReport cleaningReport={cleaningReport} />
                </div>
              )
            })
            }
          </div>
        }

      </div>
    )
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Dashboard);