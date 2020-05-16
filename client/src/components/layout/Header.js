import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../job/auth'

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {

    console.log('header')

    const landLinks = (
        <div className='header'>
            <Link className='nav_link' to='/'>Signup</Link>
            <Link className='nav_link' to='/login'>Login</Link>
            <Link className='nav_link' to='/'>About Us</Link>
        </div>
    )

    const authLinks = (
        <div className='header'>
            <Link className='nav_link' to='/home'>Home</Link>
            <Link className='nav_link' to='/dasboard'>Dasboard</Link>
            <Link className='nav_link' to='/profile'>Profile</Link>
            <a className='nav_link' href='/login' onClick={logout}>Logout</a>
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