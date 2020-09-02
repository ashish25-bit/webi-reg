import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const NotFound = ({ auth: { isAuthenticated } }) => {
    return (
        <div style={{ position: 'relative', top: '70px' }}>
            <h1>PAGE NOT FOUND.....</h1>
            <Link to={isAuthenticated ? '/event' : '/login' }>Go Back</Link>
        </div>
    )
}

NotFound.propTypes = {
    auth: PropTypes.object.isRequired
} 

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(NotFound)
