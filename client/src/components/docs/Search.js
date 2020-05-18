import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Search = ({ auth: { user } }) => {

    return (
        <div className='container_logged'>
            <h3>Search { user && user.name }</h3> 
        </div>
    )
}

Search.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps , {})(Search)
