import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CleaningCheckDates from '../CleaningCheckDates/CleaningCheckDates';
import './admindashboard.css';

function AdminDashboard(props) {
  const [newYear, setNewYear] = useState('');
  const [upcomingCheckDates, setUpcomingCheckDates] = useState([]);
  const [runRender, setRunRender] = useState(false);

  useEffect(() => {
    getAllMonths();
  }, [runRender])

  const reRender = () => {
    setRunRender(!runRender)
  }

  const pushToCurrentCheck = () => {
    props.history.push('/currentcheck');
  }

  const getAllMonths = () => {

    axios.get('/api/check_months').then(res => {
      setUpcomingCheckDates(res.data)
    })
  }


  const addCheckMonthsForNewYear = () => {
    axios.post(`/api/check_months/${newYear}`).then(res => {
      getAllMonths();
    })
  }

  return (
    <div className='admin-dashboard'>

      <div className='all-dates-container'>
        {upcomingCheckDates.map(element => {

          if (element.status !== 'ARCHIVED') {
            return (
              <div className='cleaning-check-dates'>
                < CleaningCheckDates key={element.check_month_id} data={element} reRenderFunction={reRender} pushToCurrentCheck={pushToCurrentCheck} />
              </div>
            )
          }
        })}
      </div>

      <div className='new-date-container'>
        <h3 className='new-year-title'>Add A New Year</h3>
        <div className='new-year-container'>
          <input className='input-new-year' type='text' placeholder='YYYY' onChange={e => setNewYear(e.target.value)} />
          <button className='check-dates-btn' onClick={() => addCheckMonthsForNewYear()}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;