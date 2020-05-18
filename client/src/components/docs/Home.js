import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Home = ({ auth: { user } }) => {

    return (
        <div className='container_logged'>
            <h3>Home { user && user.name }</h3> 
        </div>
    )
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps , {})(Home)