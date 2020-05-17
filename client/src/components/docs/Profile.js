import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../job/profile'
import Spinner from '../layout/Spinner'
import CreateProfile from '../themes/CreateProfile'

const Profile = ({ getCurrentProfile, auth: { user }, profile: { profile ,loading } }) => {

    // changing the document title
    useEffect(() => {document.title = 'Dashboard - WebiReg'},[])

    // 
    useEffect(() => {
        getCurrentProfile()
    }, [])

    return loading && profile === null ? (
        <Spinner/>
    ) : (
        <div className='container_logged'>
            <h3>Welcome { user && user.name }</h3>
            <CreateProfile />
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
