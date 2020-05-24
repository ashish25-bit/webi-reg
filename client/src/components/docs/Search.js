import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import uuid from 'react-uuid'
import Moment from 'react-moment'
import { register } from '../../job/event'
import OtherLink from '../layout/OtherLink'

const Search = ({ auth: { user }, register }) => {

    const [nameCheckbox, chooseName] = useState(true) // when input type is name
    const [dateCheckbox, chooseDate] = useState(false) // when input type is date
    const [loading, setLoading] = useState(false) // lazy-loading when searchinf for events
    const [formData, setFormData] = useState({ key: 'Ashish Webinar 1', type: 'name' }) 
    const [result, setResult] = useState({ events: [], errors: '' }) // results accquired
    const [ engaged, setEngaged ] = useState(false) // while registering or de-registering

    const onSubmit = e => {
        e.preventDefault()
        if (key !== '') {
            setLoading(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const data = { key: key.trim(), type, id: user._id }
            axios.post('/api/event/find', data, config)
                .then(res => {
                    setLoading(false)
                    res.data.msg ? setResult({ ...result, events: [], errors: res.data.msg }) :
                        setResult({ ...setResult, events: res.data, errors: '' })
                })
                .catch(err => console.log(err))
        }
    }

    // register or de-register from an event
    const dRegister = e => {
        e.preventDefault()
        setEngaged(true)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = {id: e.target.id}
        axios.put('/api/event/register', data, config)
            .then(res => {
                setEngaged(false)
                register(res.data)
            })
            .catch(err => console.log(err))
    }

    const { events, errors } = result

    const { key, type } = formData

    return (
        <div className='container_logged'>
            <OtherLink />
            <form method='POST' className='search_event_form' onSubmit={e => onSubmit(e)}>
                <div className='search_option'>
                    <input
                        type='checkbox'
                        name='name-checkbox'
                        checked={nameCheckbox}
                        onChange={() => {
                            chooseName(true)
                            chooseDate(false)
                            setFormData({ ...formData, key: '', type: 'name' })
                        }}
                    />
                    <input
                        type='checkbox'
                        name='date-checkbox'
                        checked={dateCheckbox}
                        onChange={() => {
                            chooseDate(true)
                            chooseName(false)
                            setFormData({ ...formData, key: '', type: 'date' })
                        }}
                    />
                </div>
                <table className='input_type'>
                    {
                        nameCheckbox ?

                            // search input
                            <Fragment>
                                <thead>
                                    <tr><th colSpan='2'>Enter Name</th></tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type='text'
                                                name='name'
                                                autoComplete='off'
                                                value={key}
                                                onChange={e => setFormData({ ...formData, key: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <button type='submit'>Search</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Fragment> :

                            // date input
                            <Fragment>
                                <thead>
                                    <tr><th>Enter Date</th></tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input
                                                type='date'
                                                value={key}
                                                onChange={e => setFormData({ ...formData, key: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <button type='submit'>Search</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Fragment>
                    }
                </table>
            </form>
            {/* events */}
            <div className='events_con'>
                <h3 style={{ textAlign: 'center' }}>
                    {
                        loading && <Fragment>Searching for key: {key}</Fragment>
                    }
                </h3>

                <div className='events_con'>
                    {
                        events.length ?
                        <Fragment>
                            {
                                events.map(event => (
                                    <div key={uuid()} className='event'>
                                        <h4>{event.name}</h4>
                                        <p className='hosted-by'>Hosted By - {event.host} on {' '}
                                            <Moment format='MMM D, YYYY'>{event.date}</Moment>
                                        </p>
                                        <p className='mail-event'>Email : {event.mail}</p>
                                        <p className='des-event'>{event.description}</p>
                                        {
                                            event.tags.length !== 0 && <div className='event-tag-con'>
                                                {
                                                    event.tags.map(tag => <span key={tag.id}>{tag.tag}</span>)
                                                }
                                            </div>
                                        }
                                        <p className='posted-on-event'>Posted On - {' '}
                                            <Moment format='MMM D, YYYY'>{event.postedOn}</Moment>
                                        </p>
                                        <button 
                                            type='button' 
                                            id={event._id}
                                            disabled={engaged}
                                            onClick={e => dRegister(e)} >
                                            {user.events.includes(event._id) ? 'De-register' : 'Register'}
                                        </button>
                                    </div>
                                ))
                            }
                        </Fragment> :
                        <div className='no-event'>{errors}</div>
                    }

                </div>

            </div>
        </div>
    )
}

Search.propTypes = {
    auth: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { register })(Search)
