import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'react-uuid'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const Registered = ({ auth: { user } }) => {

    const [result, setResult] = useState({ details: [], errors: '' })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (user.events.length) {
            setLoading(true)
            const data = { id: user.events }
            axios.post('/api/event/registered', data, config)
                .then(res => {
                    setLoading(false)
                    console.log(res.data)
                    setResult({ ...result, details: res.data, errors: '' })
                })
                .catch(err => {
                    setLoading(false)
                    setResult({ ...result, details: [], errors: err })
                })
        }

    }, [user.events])

    const { details, errors } = result

    return (
        <div className='container_logged'>
            
            {loading && <Fragment>Loading</Fragment>}
            <div className='events_con'>
                <h3>
                    <Link to='/event'>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Link>{' '}
                Events you registered for</h3>
                {
                    details.length ?
                    <Fragment>
                        {
                            details.map(event => (
                                <div key={uuid()} className='event'>
                                    <h4>{event.name}</h4>
                                    <p className='hosted-by'>Hosted By - {event.host} on {' '}
                                        <Moment format='MMM D, YYYY'>{event.date}</Moment>
                                    </p>
                                    <p className='mail-event'>Email : {event.mail}</p>
                                    <p className='des-event'>{event.description}</p>
                                    {
                                        event.tags.length && <div className='event-tag-con'>
                                            {
                                                event.tags.map(tag => <span key={tag.id}>{tag.tag}</span>)
                                            }
                                        </div>
                                    }
                                    <p className='posted-on-event'>Posted On - {' '}
                                            <Moment format='MMM D, YYYY'>{event.postedOn}</Moment>
                                    </p>
                                </div>
                            ))
                        }
                    </Fragment> :
                    <div className='no-event'>You registered for no events</div>
                }
            </div>
        </div>
    )
}

Registered.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Registered)
