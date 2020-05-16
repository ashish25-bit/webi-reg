import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../job/auth'

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: 'ashishyoel23@gmail.com',
        password: '123456'
    })
    const { email, password } = formData

    const submitForm = e => {
        e.preventDefault()
        login(email, password)
    }

    const changeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value }) 

    // redirect if logged in
    if(isAuthenticated)
        return <Redirect to='/dashboard' />

    return (
        <Fragment>
            <h2>Login</h2>
            <form method='POST' onSubmit={e => submitForm(e)}>
                <div>
                    <input
                        type='email'
                        name='email'
                        placeholder='Enter valid e-mail'
                        value={email}
                        onChange={e => changeHandler(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type='password'
                        name='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={e => changeHandler(e)}
                        required
                    />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)