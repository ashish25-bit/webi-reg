import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../job/auth'

const Navbar = ({ logout }) => {
    return (
        <div>
            <Link to='/home'>Home</Link>
            <Link to='/dasboard'>Dasboard</Link>
            <Link to='/profile'>Profile</Link>
            <a href='/login' onClick={logout}>Logout</a>
        </div>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired
} 

export default connect(null, { logout })(Navbar)