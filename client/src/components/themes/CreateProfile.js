import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile } from '../../job/profile'

const CreateProfile = ({ createProfile, history }) => {

    const [ formData, setFormData ] = useState({
        company: '', //  required
        designation: '', // required
        mobile: '', // required
        website: '',
        location: '',
        bio: ''
    })

    const {
        company,
        designation, 
        mobile, 
        website,
        location,
        bio
    } = formData

    const changeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        createProfile(formData, history)
    }

    return (
        <div>
            <form method='POST' onSubmit={e => onSubmit(e)}>
                {/* company field */}
                <div className='profile_input'>
                    <input 
                        type='text' 
                        name='company' 
                        required 
                        autoComplete='off' 
                        value={company}
                        onChange={e => changeHandler(e)}
                    />
                </div>

                {/* designation */}
                <div className='profile_input'>
                    <input 
                        type='text' 
                        name='designation' 
                        required 
                        autoComplete='off' 
                        value={designation}
                        onChange={e => changeHandler(e)}
                    />
                </div>

                {/* mobile */}
                <div className='profile_input'>
                    <input 
                        type='number' 
                        name='mobile' 
                        required 
                        autoComplete='off' 
                        value={mobile}
                        onChange={e => changeHandler(e)}
                    />
                </div>

                {/* website */}
                <div className='profile_input'>
                    <input 
                        type='text' 
                        name='website' 
                        autoComplete='off' 
                        value={website}
                        onChange={e => changeHandler(e)}
                    />
                </div>

                {/* location */}
                <div className='profile_input'>
                    <input 
                        type='text' 
                        name='location' 
                        autoComplete='off' 
                        value={location}
                        onChange={e => changeHandler(e)}
                    />
                </div>

                {/* bio */}
                <div className='profile_input'>
                    <textarea
                        type='text' 
                        name='bio' 
                        autoComplete='off'
                        value={bio}
                        onChange={e => changeHandler(e)}
                    ></textarea>
                </div>

                {/* submit button */}
                <div>
                    <button type='submit'>Add</button>
                </div>

            </form>
        </div>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}

export default connect(null, { createProfile })(withRouter(CreateProfile))
