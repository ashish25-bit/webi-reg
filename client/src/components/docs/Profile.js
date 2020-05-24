import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../../job/profile'
import Spinner from '../layout/Spinner'
import ProfileLinks from '../themes/ProfileLinks'
import Experience from '../themes/Experience'
import Education from '../themes/Education'

const Profile = ({ getCurrentProfile, auth: { user }, profile: { profile ,loading } }) => {

    // changing the document title
    useEffect(() => {document.title = 'Dashboard - WebiReg'},[])

    // 
    useEffect(() => { getCurrentProfile() }, [getCurrentProfile])

    return loading && profile === null ? (
        <Spinner/>
    ) : (
        <div className='container_logged'>
            <div className='profile_con'>
                <h2>Welcome { user && user.name }</h2>
                {
                    profile !== null ? 
                    <Fragment>
                        <ProfileLinks />
                        <p className='info_lable'>Company</p>
                        <p className='pro_info'>{profile.company}</p>
                        <p className='info_lable'>Designation</p>
                        <p className='pro_info'>{profile.designation}</p>
                        <p className='info_lable'>Mobile</p>
                        <p className='pro_info'>{profile.mobile}</p>
                        <p className='info_lable'>Website</p>
                        <p className='pro_info'>
                            {
                                profile.website ? 
                                    <a href={profile.website} rel="noopener noreferrer" target='_blank'>{profile.website}</a> : 
                                    <span className='no_value'>Go to edit profile to add website.</span>
                            }
                        </p>
                        <p className='info_lable'>Location</p>
                        <p className='pro_info'>
                            {
                                profile.location ?
                                <Fragment>{profile.location}</Fragment> : 
                                <span className='no_value'>Go to edit profile to add location.</span>
                            }
                        </p>
                        <p className='info_lable'>Bio</p>
                        <p className='pro_info'>
                            {
                                profile.bio ? 
                                <Fragment>{profile.bio}</Fragment> : 
                                <span className='no_value'>Go to edit profile to add bio.</span>
                            } 
                        </p>
                        {
                            profile.social && <Fragment>
                                {/* Twitter */}
                                <p className='info_lable'>Twitter</p>
                                <p className='pro_info'>
                                    {
                                        profile.social.twitter ?
                                        <a href={profile.social.twitter} rel="noopener noreferrer" target='_blank'>{profile.social.twitter}</a> :
                                        <span className='no_value'>Go to edit profile to add twitter account link.</span>
                                    }
                                </p>
                                {/* Facebook */}
                                <p className='info_lable'>Facebook</p>
                                <p className='pro_info'>
                                    {
                                        profile.social.facebook ?
                                        <a href={profile.social.facebook} rel="noopener noreferrer" target='_blank'>{profile.social.facebook}</a> :
                                        <span className='no_value'>Go to edit profile to add facebook account link.</span>
                                    }
                                </p>
                                {/* linkedin */}
                                <p className='info_lable'>Linkedin</p>
                                <p className='pro_info'>
                                    {
                                        profile.social.linkedin ?
                                        <a href={profile.social.linkedin} rel="noopener noreferrer" target='_blank'>{profile.social.linkedin}</a> :
                                        <span className='no_value'>Go to edit profile to add linkedin account link.</span>
                                    }
                                </p>
                                {/* instagram */}
                                <p className='info_lable'>Instagram</p>
                                <p className='pro_info'>
                                    {
                                        profile.social.instagram ?
                                        <a href={profile.social.instagram} rel="noopener noreferrer" target='_blank'>{profile.social.instagram}</a> :
                                        <span className='no_value'>Go to edit profile to add instagram account link.</span>
                                    }
                                </p>
                            </Fragment>
                        }

                        {/* Experiences */}
                        <div className='edu_exp_con'>
                            <h3>Experience</h3>
                            <Fragment>{ profile.experience.length ? 
                                    <Experience experience={profile.experience} /> : 
                                    <p>There is no experience list {' | '} 
                                        <Link to='settings/profile/experience'>Add Experience</Link>
                                    </p> 
                            }</Fragment>

                            {/* Education */}
                            <h3>Education</h3>
                            <Fragment>{ profile.education.length ? 
                                    <Education education={profile.education} /> : 
                                    <p>There is no education list {' | '} 
                                        <Link to='settings/profile/education'>Add Education</Link>
                                    </p> 
                            }</Fragment>
                        </div>

                    </Fragment> : 

                    <Fragment>
                        <p>No Profile Found.. :( <br/> Setup your profile</p>
                        <p><Link to='/settings/profile/setup'>Setup</Link></p>
                    </Fragment>
                }
            </div>
        </div>
    )
}

Profile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile : state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Profile)
