import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CleaningCheckDates from '../CleaningCheckDates/CleaningCheckDates';

function Archive(props) {
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


  return (
    <div>
      {upcomingCheckDates.map(element => {

        if (element.status === 'ARCHIVED') {
          return (
            <div>
              < CleaningCheckDates key={element.check_month_id} data={element} reRenderFunction={reRender} pushToCurrentCheck={pushToCurrentCheck} />
            </div>
          )
        }
      })}

    </div>
  )
}

export default Archive;