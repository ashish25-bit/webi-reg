import React from 'react'
import { Link } from 'react-router-dom'

const ProfileLinks = () => {
    return (
        <div className='profile_links_con'>
            <Link className='profile_links' to='/settings/profile/edit'>Edit Profile</Link> { ' | '}
            <Link className='profile_links' to='/add_experience'>Add Experience</Link> { ' | '}
            <Link className='profile_links' to='/add_education'>Add Education</Link>
        </div>
    )
}

export default ProfileLinks