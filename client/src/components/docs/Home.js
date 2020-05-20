import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Home = ({ auth: { user } }) => {

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date()

    // const selectedYear = date.getFullYear()
    // const selectedMonth = monthShort[date.getMonth()]
    const todayDate = date.getDate()

    const [ selectedYear, setSelectedYear ] = useState(date.getFullYear())
    const [ selectedMonth, setSelectedMonth ] = useState(monthShort[date.getMonth()])
    const [ index, setIndex ] = useState(date.getMonth())
    const [ currentIndex, setCurrentIndex ] = useState(date.getMonth())

    useEffect(() => {
        let days = getNumberOfDays()
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
        console.log(e.target.innerText)
    }

    const nextMon = () => {
        // currentIndex < 11 ? 
        // if(currentIndex < 11) {
        //     setCurrentIndex(prevState => prevState + 1)
        //     setSelectedMonth(monthShort[currentIndex])
        // }
        setCurrentIndex(prevState => prevState < 11 ? prevState + 1 : index )
        // else {
        //     setCurrentIndex(index)
        //     
        // }
        setSelectedMonth(monthShort[currentIndex])
    }

    const prevMon = () => {
        setSelectedMonth(monthShort[index])
    }

    return (
        <div className='container_logged'>
            <div className='calendar_con'>
                <h3>{date.getDate()} {monthShort[date.getMonth()]}, {date.getFullYear()}</h3>
                <div className='week_container'></div>
                <div className='dates_container'></div>
                <div className='date_selector'>
                    <button className='prev' onClick={() => prevMon()}><i class="fa fa-caret-left" aria-hidden="true"></i></button>
                    <span className='selected_mon'>{selectedMonth}</span>
                    <button className='next' onClick={() => nextMon()}><i class="fa fa-caret-right" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    )
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Home)