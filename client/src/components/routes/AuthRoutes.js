import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AuthRoutes = ({
    component: Component,
    auth: { isAuthenticated },
    ...rest
}) => {
    return (
        <Route 
            {...rest}
            render={props => 
                localStorage.getItem('token') === null ? (
                    <Component {...props} /> 
                ) : !isAuthenticated ? (
                    <h2>Loading...</h2>
                ) : (
                    <Redirect to='/event/post' />
                )
            }
        />
    )
}

AuthRoutes.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
}) 

export default connect(mapStateToProps)(AuthRoutes)
