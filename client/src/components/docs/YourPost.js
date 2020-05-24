import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Events from '../themes/Events'
import { Link } from 'react-router-dom'
import OtherLinks from '../layout/OtherLink'

const YourPost = ({ match }) => {

    const [details, setDetails] = useState({ info: [], error: '' })

    useEffect(() => {
        axios.get(`/api/event/id/${match.params.id}`)
            .then(res => setDetails({ ...details, info: [res.data] }))
            .catch(err => setDetails({ ...details, info: {}, error: err }))
    }, [match])

    const { info, error } = details

    return (
        <div className='container_logged'>
            <OtherLinks />
            <div className='your_post_det'>
                <h3>
                    <Link to='/event/posted'>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Link>{' '}
                Go Back</h3>
                {error.length !== 0 && <Fragment>{error}</Fragment>}
                {info.length !== 0 && <Events events={info} />}
            </div>
            
        </div>
    )
}

export default YourPost
