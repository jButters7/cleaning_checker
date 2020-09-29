import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function AdminDashboard() {
  const [newYear, setNewYear] = useState('');
  const [upcomingCheckDates, setUpcomingCheckDates] = useState([]);
  const [specificCheckDateId, setSpecificCheckDateId] = useState(null);

  useEffect(() => {
    console.log('hit')
    axios.get('/api/check_months').then(res => {
      setUpcomingCheckDates(res.data)
    })
  }, [])


  const addCheckMonthsForNewYear = () => {
    console.log(newYear)
    axios.post(`/api/check_months/${newYear}`).then(res => {
      let newList = [...upcomingCheckDates];

      for (let i = 0; i < res.data.length; i++) {
        newList.push(res.data[i])
      }
      console.log(newList)
      setUpcomingCheckDates(newList)
    })
  }

  const beginCleaningCheck = () => {
    console.log('button works')
  }


  return (
    <div>
      <input type='text' placeholder='YYYY' onChange={e => setNewYear(e.target.value)} />
      <button onClick={() => addCheckMonthsForNewYear()}>Add New Year</button>
      {upcomingCheckDates.map(element => {
        return (
          <div>
            <div>
              {/* This the YEAR */}
              {moment(element.check_month).format('MMMM YYYY')}
            </div>

            {/* This next .map looks at the individual element and maps over the dates within that element. */}

            {element.check_dates.map(dates => {
              return (
                <div>
                  {dates.check_date.substring(5, 10)}
                </div>
              )
            })}

            <button onClick={() => beginCleaningCheck()}>Begin Cleaning Check</button>
            <button>Archive</button>
          </div>
        )

      })}
    </div>
  )
}

export default AdminDashboard;