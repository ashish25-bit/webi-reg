import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { createProfile } from '../../job/profile'

const CreateProfile = ({ createProfile, history }) => {

    useEffect(() => {document.title = 'Profile Setup'}, [])

    const [ formData, setFormData ] = useState({
        company: 'SRM', //  required
        designation: 'Student', // required
        mobile: '8004373531', // required
        website: '',
        location: '',
        bio: 'djchdcv'
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
        <div className='container_logged'>
            <form method='POST' onSubmit={e => onSubmit(e)} className='profile_form'>
                <h2>Create Profile</h2>
                {/* company field */}
                <div className='profile_input'>
                    <label>Company</label>
                    <input 
                        type='text' 
                        name='company' 
                        placeholder='company'
                        required 
                        autoComplete='off' 
                        value={company}
                        onChange={e => changeHandler(e)}
                    />
                </div>

                {/* designation */}
                <div className='profile_input'>
                    <label>Designation</label>
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
                    <label>Mobile</label>
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
                    <label>Website</label>
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
                    <label>Location</label>
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
                    <label>Bio</label>
                    <textarea
                        type='text' 
                        name='bio' 
                        autoComplete='off'
                        value={bio}
                        onChange={e => changeHandler(e)}
                    ></textarea>
                </div>

                {/* submit button */}
                <div className='profile_btn_con'>
                    <button type='submit'>Add</button>{ ' | ' }
                    <Link to='/profile'>Go Back</Link>
                </div>

            </form>
        </div>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}

export default connect(null, { createProfile })(withRouter(CreateProfile))
