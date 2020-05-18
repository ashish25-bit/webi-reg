import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../../job/profile'
import Spinner from '../layout/Spinner'
import ProfileLinks from '../themes/ProfileLinks'

const Profile = ({ getCurrentProfile, auth: { user }, profile: { profile ,loading } }) => {

    // changing the document title
    useEffect(() => {document.title = 'Dashboard - WebiReg'},[])

    // 
    useEffect(() => { getCurrentProfile() }, [])

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
                                    <a href={profile.website}>{profile.website}</a> : 
                                    <span className='no_value'>Go to edit profile to add website</span>
                            }
                        </p>
                        <p className='info_lable'>Location</p>
                        <p className='pro_info'>
                            {
                                profile.location ?
                                <Fragment>{profile.location}</Fragment> : 
                                <span className='no_value'>Go to edit profile to add location</span>
                            }
                        </p>
                        <p className='info_lable'>Bio</p>
                        <p className='pro_info'>
                            {
                                profile.bio ? 
                                <Fragment>{profile.bio}</Fragment> : 
                                <span className='no_value'>Go to edit profile to add bio</span>
                            } 
                        </p>
                    </Fragment> : 

                    <Fragment>
                        <p>No Profile Found.. :( -> Setup your profile</p>
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
