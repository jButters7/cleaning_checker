import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { setReduxMonthId } from '../../ducks/reducer';


function CleaningCheckDates(props) {
  const [specificMonthId, setSpecificMonthId] = useState(null);
  const [monthStatus, setMonthStatus] = useState('');
  const [isCheckDateInputDisplayed, setIsCheckDateInputDisplayed] = useState(false);
  const [check_date, setAddCheckDate] = useState('');

  useEffect(() => {
    setSpecificMonthId(props.data.check_month_id)
    setMonthStatus(props.data.status)
  }, [])

  const beginCleaningCheck = (props) => {
    axios.post(`/api/check/${specificMonthId}`).then(res => {
      console.log(props.data.check_month_id);
      props.setReduxMonthId(props.data.check_month_id);
      props.pushToCurrentCheck();
    }).catch(err => alert(err.message));
  }

  const continueCleaningCheck = () => {
    props.setReduxMonthId(props.data.check_month_id);
    props.pushToCurrentCheck();
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
    console.log(props)
  }

  const archiveMonth = (checkMonthId, props) => {
    axios.put(`/api/check/${checkMonthId}`).then(res => {
      console.log(res.data)
    }).catch(err => alert(err.message));
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
          <button onClick={() => alterAddDateDisplay()}>Add Date</button> :
          <div>
            <button onClick={() => {
              return saveCheckDate(props.data.check_month_id, props);
            }}>Save Date</button>
            <button onClick={() => alterAddDateDisplay()}>Cancel</button>
          </div>
        }

        {(monthStatus === 'INITIAL') ?
          <button onClick={() => beginCleaningCheck(props)}>Begin Cleaning Check</button> :
          (monthStatus === 'INPROGRESS') ?
            <div>
              <button button onClick={() => continueCleaningCheck()}>Continue Cleaning Check</button>
              <button onClick={() => archiveMonth(props.data.check_month_id, props)}>Archive</button>
            </div> : null}


      </div>
    </div >
  )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { setReduxMonthId })(CleaningCheckDates);