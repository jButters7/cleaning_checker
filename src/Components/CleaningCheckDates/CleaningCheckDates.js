import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { setReduxMonthId } from '../../ducks/reducer';
import './cleaningcheckdates.css'


function CleaningCheckDates(props) {
  const [specificMonthId, setSpecificMonthId] = useState(null);
  const [monthStatus, setMonthStatus] = useState('');
  const [isCheckDateInputDisplayed, setIsCheckDateInputDisplayed] = useState(false);
  const [check_date, setAddCheckDate] = useState('');
  const [existingDate, setExistingDate] = useState('');
  const [editDateInputsDisplay, setEditDateInputsDisplay] = useState(false);
  const [editCheckDateInfo, setEditCheckDateInfo] = useState('');

  useEffect(() => {
    setSpecificMonthId(props.data.check_month_id);
    setMonthStatus(props.data.status);
    setExistingDate(props.data.check_dates[0]);
  }, [])

  console.log(existingDate);

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

  const editCheckDate = (dateId, props) => {
    axios.put(`/api/check_date/${dateId}/${editCheckDateInfo}`).then(res => {
      console.log(res.data);
    }).catch(err => alert(err.message));
    props.reRenderFunction();
    setEditDateInputsDisplay(false)
  }

  return (
    <div className='cleaningcheckdates-container'>

      <div className='ccd-inner-container'>
        <div className='month-info'>
          {/* This the MONTH & YEAR */}
          {moment(props.data.check_month).format('MMMM YYYY')}

        </div>

        {/* This next .map looks at the individual element and maps over the dates within that element. */}
        {props.data.check_dates.map(dates => {
          return (
            <div key={dates.check_date_id} className='date-and-edit-btns'>
              {!editDateInputsDisplay ?
                <div>
                  {/* This the ACTUAL CLEANING CHECK DATE */}
                  {moment(dates.check_date).format('ll')}
                </div> :
                <input type='date' className='date-input-box' onChange={e => setEditCheckDateInfo(e.target.value)} />
              }

              {(monthStatus !== 'INPROGRESS') ?
                !editDateInputsDisplay ?
                  <button className='check-dates-btn edit-btn' onClick={() => setEditDateInputsDisplay(!editDateInputsDisplay)}>Edit Date</button> :
                  <div>
                    <button className='check-dates-btn' onClick={() => editCheckDate(dates.check_date_id, props)}>Save Edit</button>
                    <button className='check-dates-btn' onClick={() => setEditDateInputsDisplay(!editDateInputsDisplay)}>Cancel</button>
                  </div>
                :
                null
              }


            </div>
          )
        })}

        {isCheckDateInputDisplayed ?
          <div>
            <input type="date" className='date-input-box' onChange={e => setAddCheckDate(e.target.value)} />
          </div> :
          null
        }

        {(existingDate === undefined) ?
          !isCheckDateInputDisplayed ?
            <button className='check-dates-btn' onClick={() => alterAddDateDisplay()}>Add Date</button> :
            <div>
              <button className='check-dates-btn' onClick={() => {
                return saveCheckDate(props.data.check_month_id, props);
              }}>Save Date</button>
              <button className='check-dates-btn' onClick={() => alterAddDateDisplay()}>Cancel</button>
            </div>
          :
          null
        }


        {(existingDate !== undefined) ?

          (monthStatus === 'INITIAL') ?
            <div>
              <button className='check-dates-btn begin-continue-btn' onClick={() => beginCleaningCheck(props)}>Begin Cleaning Check</button>
            </div> :
            (monthStatus === 'INPROGRESS') ?
              <div className='continue-archive-container'>
                <button className='check-dates-btn archive-btn' onClick={() => archiveMonth(props.data.check_month_id, props)}>Archive</button>
                <button className='check-dates-btn continue-btn' onClick={() => continueCleaningCheck()}>Continue Cleaning Check</button>
              </div> : null
          :
          null
        }


      </div>
    </div >
  )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { setReduxMonthId })(CleaningCheckDates);