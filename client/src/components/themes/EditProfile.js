import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createProfile, getCurrentProfile } from '../../job/profile'
import Alert from '../layout/Alert'

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
            <form method='POST' onSubmit={e => onSubmit(e)}>
                {/* company field */}
                <div className='profile_input'>
                    <label>company</label>{' '}
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
                    <label>designation</label>{' '}
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
                    <label>mobile</label>{' '}
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
                    <label>website</label>{' '}
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
                    <label>location</label>{' '}
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
                    <label>bio</label>{' '}
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
            <Alert/>
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
