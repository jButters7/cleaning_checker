import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function CleaningCheckDates(props) {
  const [specificCheckDateId, setSpecificCheckDateId] = useState({});
  const [currentCheckApartments, setCurrentCheckApartments] = useState([]);
  const [isCheckDateInputDisplayed, setIsCheckDateInputDisplayed] = useState(false);
  const [check_date, setAddCheckDate] = useState('');

  useEffect(() => {
    setSpecificCheckDateId(props.data.check_dates[0])
  }, [])

  const beginCleaningCheck = () => {
    axios.post(`/api/check/`, specificCheckDateId).then(res => {
      setCurrentCheckApartments(res.data)
    }).catch(err => alert(err.message));
  }

  const alterAddDateDisplay = () => {
    setIsCheckDateInputDisplayed(!isCheckDateInputDisplayed);
  }

  const saveCheckDate = (checkMonthId, props) => {
    if (!check_date) {
      return alert('You must input a date before Saving')
    }
    axios.post(`/api/check_date/${checkMonthId}`, { check_date }).then(res => {
      console.log(res.data);
    }).catch(err => alert(err.message));
    alterAddDateDisplay();
    props.reRenderFunction();
  }

  return (
    <div>

      <div>
        <div>
          {/* This the MONTH & YEAR */}
          {moment(props.data.check_month).format('MMMM YYYY')}

        </div>

        {/* This next .map looks at the individual element and maps over the dates within that element. */}
        {props.data.check_dates.map(dates => {
          return (
            <div key={dates.check_date_id}>
              {moment(dates.check_date).format('ll')}
            </div>
          )
        })}

        {isCheckDateInputDisplayed ?
          <div>
            <input type="date" onChange={e => setAddCheckDate(e.target.value)} />
          </div> :
          null
        }

        {!isCheckDateInputDisplayed ?
          <button onClick={() => alterAddDateDisplay()}>Add Check Date</button> :
          <div>
            <button onClick={() => {
              return saveCheckDate(props.data.check_month_id, props);
            }
            }>Save Date</button>
            <button onClick={() => alterAddDateDisplay()}>Cancel</button>
          </div>
        }

        <button onClick={() => beginCleaningCheck()}>Begin Cleaning Check</button>
        <button>Archive</button>
      </div>
    </div >
  )
}

export default CleaningCheckDates;