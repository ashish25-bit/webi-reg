import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AuthRoutes = ({
    component: Component,
    auth: { isAuthenticated },
    ...rest
}) => {
    console.log(localStorage.getItem('token'))
    return (
        <Route 
            {...rest}
            render={props => 
                !isAuthenticated ? (
                     <Component {...props} />
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
