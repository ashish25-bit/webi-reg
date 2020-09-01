import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../job/auth'
import Alert from '../layout/Alert'

const Login = ({ login }) => {

    const [formData, setFormData] = useState({
        email: 'ashishyoel23@gmail.com',
        password: '123456'
    })
    const { email, password } = formData

    const submitForm = e => {
        e.preventDefault()
        login(email, password)
    }

    // changing the document title
    useEffect(() => {document.title = 'WebiReg - Login'},[])

    const changeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value }) 

    return (
        <Fragment>
            <div className="container_login">
                <div className="wrapper">
                    <div className="aside">
                        <ul>
                            <li>Register for a webinar.</li>
                            <li>Post webinar details.</li>
                            <li>Get email before staring of the webinar</li>
                            <li>Don’t miss any webinar.</li>
                        </ul>
                    </div>
                    <div className='login_con'>
                        <form method='POST' className='form' onSubmit={e => submitForm(e)}>
                            <div className='form_head'>Sign In</div>

                            {/* email input field */}
                            <div className="field">
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder=" " 
                                    className='input_field' 
                                    autoComplete="off" 
                                    required 
                                    value={email}
                                    onChange={e => changeHandler(e)}
                                /> 
                                <label htmlFor="email" className='label'>Email</label>
                            </div>

                            {/* password input field */}
                            <div className="field">
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder=" " 
                                    className='input_field' 
                                    autoComplete="off" 
                                    required 
                                    value={password}
                                    onChange={e => changeHandler(e)}
                                /> 
                                <label htmlFor="password" className='label'>Password</label>
                            </div>

                            {/* submit button */}
                            <div className='btn_con'>
                                <button type="submit">Sign In</button>
                            </div>
                            <div className='auth_error'> <Alert /> </div>   
                            <div className="already">Don't have an account? <a href='/'>Sign Up</a></div>

                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    // isAuthenticated: PropTypes.bool,
}

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
// })

export default connect(null, { login })(Login)