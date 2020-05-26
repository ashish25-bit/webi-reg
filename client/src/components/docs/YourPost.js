import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Events from '../themes/Events'
import { Link } from 'react-router-dom'
import OtherLinks from '../layout/OtherLink'

const YourPost = ({ match }) => {

    const [details, setDetails] = useState({ info: [], error: '' })
    const [members, setMembers] = useState([])

    useEffect(() => {
        axios.get(`/api/event/id/${match.params.id}`)
            .then(res => {
                setMembers(res.data.users)
                setDetails({ ...details, info: [res.data.event] })
            })
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
            <div className='participants_con'>
                <h3>Participants</h3>
                {
                    members.length !== 0 ? <Fragment>{
                        members.map(member => (
                            <div className='participant'>
                                {member.name} {' '} <span>{member.email}</span>
                            </div>
                        ))
                    }
                    </Fragment> :
                    <p>There are no participants</p>
                }
            </div>
        </div>
    )
}

export default YourPost
