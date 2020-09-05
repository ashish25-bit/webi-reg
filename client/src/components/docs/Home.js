import React, { useState, useEffect, Fragment } from 'react'
import uuid from 'react-uuid'
import api from '../../utils/api'
import Moment from 'react-moment'
import Events from '../themes/Events'
import OtherLinks from '../layout/OtherLink'

const Home = () => {

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date()

    const todayDate = date.getDate()
    let filterMonths = monthShort.filter((mon, index) => index >= date.getMonth())

    // this will contain the current date selected
    const [selectedDate, setDate] = useState(date.getDate())
    // this will contain the current year selected 
    const [selectedYear, setSelectedYear] = useState(date.getFullYear())
    // this will contain the months selected
    const [selectedMonth, setSelectedMonth] = useState(monthShort[date.getMonth()])
    // this will contain the months which is allowed for a particular year
    const [allowedMonths, setAllowedMonths] = useState(filterMonths)
    // this is for showing the allowed month list 
    const [showMonths, toggleShowMonths] = useState(false)
    // this will contain the result obtain for the selected date
    const [result, setResult] = useState({ events: [], msg: '', searchedDate: '' })
    // this will contain the whether the information is fetched or not
    const [loading, setLoading] = useState(false)

    // for getting the events user has registered for a particular date
    useEffect(() => {
        setLoading(true)
        var d = new Date()
        d.setFullYear(selectedYear, monthShort.indexOf(selectedMonth), selectedDate)
        const sendDate = d.toLocaleDateString().split('/').reverse().join('-')

        api.post('/event/date', { date: sendDate })
            .then(res => {
                !res.data.msg ?
                    setResult({ ...result, events: res.data, msg: '', searchedDate: sendDate }) :
                    setResult({ ...result, events: [], msg: res.data.msg, searchedDate: sendDate })
                setLoading(false)
            })
            .catch(err => setResult({ ...result, events: [], msg: err }))
    }, [selectedDate])

    // for displaying the calendar
    useEffect(() => {
        let days = getNumberOfDays()
        setAllowedMonths(selectedYear === date.getFullYear() ? filterMonths : monthShort)
        // this will contain the day of the 1st date
        const first = new Date(selectedYear, monthShort.indexOf(selectedMonth), 1).getDay()
        displayWeekDays(first)
        displayDates(days)
    }, [selectedYear, selectedMonth])

    // to get the number of days in a month
    function getNumberOfDays() {
        const m = monthShort.indexOf(selectedMonth) // temporary variable to store the month value
        // for february
        if (m === 1) {
            if (selectedYear % 4 === 0) {
                if (selectedYear % 100 === 0) {
                    if (selectedYear % 400 === 0)
                        return 29
                    return 28
                }
                return 29
            }
            return 28
        }
        // for 30 days
        else if (m === 3 || m === 5 || m === 8 || m === 10)
            return 30
        // for 31 days
        return 31
    }

    // display the week days 
    function displayWeekDays(first) {
        const week = document.querySelector('.week_container')
        week.innerHTML = ''
        for (let i = first; i < 7; i++) {
            const div = document.createElement('div')
            div.innerText = weekDays[i]
            week.appendChild(div)
        }
        for (let i = 0; i < first; i++) {
            const div = document.createElement('div')
            div.innerText = weekDays[i]
            week.appendChild(div)
        }
    }

    // display the dates
    function displayDates(days) {
        const dates = document.querySelector('.dates_container')
        dates.innerHTML = ''
        const d = new Date()
        for (let i = 1; i <= days; i++) {
            const date = document.createElement('div')
            date.innerText = i
            if (selectedYear !== d.getFullYear() || selectedMonth !== monthShort[d.getMonth()]) {
                date.classList.add('date')
                date.addEventListener('click', getEvents)
            }

            else {
                date.classList.add(i >= todayDate ? 'date' : 'pastDate')
                if (i === todayDate)
                    date.classList.add('today')
                i >= todayDate && date.addEventListener('click', getEvents)
            }
            dates.appendChild(date)
        }
    }

    // event listener for the dates
    const getEvents = e => {
        setDate(parseInt(e.target.innerText))
    }

    const { events, msg, searchedDate } = result

    return (
        <div className='container_logged'>
            <div className='calendar_con'>
                <h3>{date.getDate()} {monthShort[date.getMonth()]}, {date.getFullYear()}</h3>
                <div className='week_container'></div>
                <h5>{selectedMonth} - {selectedYear}</h5>
                <div className='dates_container'></div>
                <div className='date_selector'>
                    {/* for months */}
                    <span>
                        <span className='selected_mon'>{selectedMonth}</span>
                        <button
                            className='mon_down'
                            onClick={() => toggleShowMonths(!showMonths)} >
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </button>
                        {
                            showMonths && <Fragment>
                                <ul className='allowed_months'> {
                                    allowedMonths.map(mon => (
                                        <li
                                            key={uuid()}
                                            onClick={e => {
                                                setSelectedMonth(e.target.innerText)
                                                toggleShowMonths(!showMonths)
                                            }}
                                        >{mon}</li>
                                    ))
                                }
                                </ul>
                            </Fragment>
                        }
                    </span>
                    {/* for year */}
                    <span>
                        <button
                            className='prev'
                            onClick={() => setSelectedYear(prevState => prevState - 1)}
                            disabled={selectedYear === date.getFullYear()} >
                            <i className="fa fa-caret-left" aria-hidden="true"></i>
                        </button>

                        <span className='selected_year'>{selectedYear}</span>

                        <button
                            className='next'
                            onClick={() => setSelectedYear(prevState => prevState + 1)} >
                            <i className="fa fa-caret-right" aria-hidden="true"></i>
                        </button>
                    </span>
                </div>
            </div>

            <OtherLinks />

            {/* display any events, if any */}
            <div className='today_events'>
                {
                    loading ?
                        <Fragment>Loading</Fragment> :
                        <Fragment>
                            <h3>Showing results for : <Moment format='D MMMM, YYYY'>{searchedDate}</Moment></h3>
                            {msg !== '' && <p className='no-event'>{msg}</p>}
                            {events.length !== 0 && <Events events={events} />}
                        </Fragment>
                }
            </div>

        </div>
    )
}

export default Home