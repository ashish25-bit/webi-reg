import React, { useState, useEffect, Fragment } from 'react'
import api from '../../utils/api'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Events from '../themes/Events'

const Registered = ({ auth: { user } }) => {

    const [result, setResult] = useState({ details: [], errors: '' })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user.events.length) {
            setLoading(true)
            const data = { id: user.events }
            api.post('/event/registered', data)
                .then(res => {
                    setLoading(false)
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
                { errors.length !== 0 && <p>{errors}</p> }
                {
                    details.length !== 0 ?  
                        <Events events={details} /> :
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
