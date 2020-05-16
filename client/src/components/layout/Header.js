import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../job/auth'

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {

    const landLinks = (
        <div>
            <Link to='/'>Signup</Link>
            <Link to='/login'>Login</Link>
        </div>
    )

    const authLinks = (
        <div>
            <Link to='/home'>Home</Link>
            <Link to='/dasboard'>Dasboard</Link>
            <Link to='/profile'>Profile</Link>
            <a href='/login' onClick={logout}>Logout</a>
        </div>
    )

    return (
        <Fragment>
            <Fragment>{ isAuthenticated ? authLinks : landLinks }</Fragment>
        </Fragment>
    )
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
} 

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header)