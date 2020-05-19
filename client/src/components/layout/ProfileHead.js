import React from 'react'
import { Link } from 'react-router-dom'

const ProfileHead = ({ head }) => {
    return (
        <h2>
            <Link className='arrow_link' to='/profile'> 
                <i className="fa fa-arrow-left" aria-hidden="true"></i> 
            </Link>  {' '} 
            {head}
        </h2>
    )
}

export default ProfileHead