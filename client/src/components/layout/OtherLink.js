import React from 'react'
import { Link } from 'react-router-dom'

const OtherLink = () => {
    return (
        <div className='other-links'>
            <Link to='/event/posted'>Webinars You Posted</Link>{' | '}
            <Link to='/event/registered'>Webinars You Registered for</Link>
        </div>
    )
}

export default OtherLink
