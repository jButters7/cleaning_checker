import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CleaningCheckDates from '../CleaningCheckDates/CleaningCheckDates';


function AdminDashboard() {
  const [newYear, setNewYear] = useState('');
  const [upcomingCheckDates, setUpcomingCheckDates] = useState([]);
  const [runRender, setRunRender] = useState(false);

  useEffect(() => {
    getAllMonths();
  }, [runRender])

  const reRender = () => {
    setRunRender(!runRender)
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
    <div>
      <input type='text' placeholder='YYYY' onChange={e => setNewYear(e.target.value)} />
      <button onClick={() => addCheckMonthsForNewYear()}>Add New Year</button>
      {upcomingCheckDates.map(element => {
        return (
          <div>
            < CleaningCheckDates key={element.check_month_id} data={element} reRenderFunction={reRender} />
          </div>
        )
      })}

    </div>
  )
}

export default AdminDashboard;