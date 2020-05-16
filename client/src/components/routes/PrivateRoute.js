import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth: { isAuthenicated, loading }, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenicated ?
                (<Component {...props} />) :
                (<Redirect to='/' />)                
        }
    />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
