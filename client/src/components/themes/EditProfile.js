import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { createProfile, getCurrentProfile } from '../../job/profile'
import Alert from '../layout/Alert'
import ProfileLinks from './ProfileLinks'

const EditProfile = ({profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {


    const [ formData, setFormData ] = useState({
        company: '', //  required
        designation: '', // required
        mobile: '', // required
        website: '',
        location: '',
        bio: ''
    })

    useEffect(() => {
        document.title = 'Profile Edit'
        getCurrentProfile()
        setFormData({
            company: loading || profile.company,
            designation: loading || profile.designation,
            mobile: loading || profile.mobile,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            bio: loading || !profile.bio ? '' : profile.bio,
        })
    }, [loading])

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
        createProfile(formData, history, true)
    }

    return (
        <div className='container_logged'>
            <div className='plc'><ProfileLinks /></div>
            <form method='POST' onSubmit={e => onSubmit(e)} className='profile_form'>
                <h2>Edit Profile</h2>
                {/* company field */}
                <div className='profile_input'>
                    <label>Company</label>
                    <input 
                        type="text"
                        name="company"
                        autoComplete="off"
                        required 
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
                    <button type='submit'>Update</button>{ ' | ' }
                    <Link to='/profile'>Go Back</Link>
                </div>
                <p className="alert-profile"><Alert/></p>
            </form>
        </div>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))