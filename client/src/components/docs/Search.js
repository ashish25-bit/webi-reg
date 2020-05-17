import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../job/profile'
import { Redirect } from 'react-router-dom'
import Spinner from '../layout/Spinner'

const Search = ({ getCurrentProfile, auth: { user }, profile: { profile ,loading } }) => {

    useEffect(() => {getCurrentProfile()}, [])
    return loading && profile === null ? (
        <Spinner/>
    ) : (
        <div className='container_logged'>
            {/*  if the profile has all the essential information go to the home page */}
            <h3>Search { user && user.name }</h3>
            {profile != null ? <Fragment>Profile</Fragment> : 
            // if the profile is not present ... redirect to the dashboard page...
            <Redirect to='/profile' />} 
        </div>
    )
}

Search.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile : state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Search)
