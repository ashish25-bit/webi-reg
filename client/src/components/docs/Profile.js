import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../../job/profile'
import Spinner from '../layout/Spinner'

const Profile = ({ getCurrentProfile, auth: { user }, profile: { profile ,loading } }) => {

    // changing the document title
    useEffect(() => {document.title = 'Dashboard - WebiReg'},[])

    // 
    useEffect(() => { getCurrentProfile() }, [])

    return loading && profile === null ? (
        <Spinner/>
    ) : (
        <div className='container_logged'>
            <h3>Welcome { user && user.name }</h3>
            {
                profile !== null ? 
                <Fragment>
                    <div>
                    <Link to='/settings/profile/edit'>Edit</Link> {' '}
                    <Link to='/add_experience'>Add Experience</Link> {' '}
                    <Link to='/add_education'>Add Education</Link>
                    </div>
                    <p>{profile.company}</p>
                    <p>{profile.designation}</p>
                    <p>{profile.mobile}</p>
                    <p>{profile.website && <a href={profile.website} >{profile.website}</a>}</p>
                    <p>{profile.location && <Fragment>{profile.location}</Fragment>}</p>
                    <p>{profile.bio && <Fragment>{profile.bio}</Fragment>}</p>
                </Fragment> : 

                <Fragment>
                    <p>No Profile Found.. :( -> Setup your profile</p>
                    <p><Link to='/settings/profile/setup'>Setup</Link></p>
                </Fragment>
            }
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
