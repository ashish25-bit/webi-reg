import React , { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../job/alert'
import { register } from '../../job/auth'
import PropTypes from 'prop-types'

const Signup = ({ setAlert, register, isAuthenticated }) => {

    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const { name, email, password, cpassword } = formData
    
    // manage state of the form data 
    const changeHandler = e => setFormData(({ ...formData , [e.target.name] : e.target.value }) )

    // on submit function
    // check whether all the mandatory fields are filled
    const submitForm = e => {
        e.preventDefault()
        if(password !== cpassword)
            setAlert('Password dont match' , 'danger')
        else
            register({ name, email, password })
    }

    // redirect if logged in
    if(isAuthenticated)
        return <Redirect to='/dashboard' />

    return (
        <Fragment> 

            <div className="container">
                <div className="wrapper">
                    <div className="aside"></div>
                    <div className='signup_con'>
                        <form method='POST' className='form' onSubmit={e => submitForm(e)} >
                            <div className='form_head'>Sign Up</div>

                            {/* name input field */}
                            <div className="field">
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    placeholder=" " 
                                    className='input_field' 
                                    autoComplete="off" 
                                    required 
                                    value={name}
                                    onChange={e => changeHandler(e)}
                                /> 
                                <label htmlFor="name" className='label'>Name</label>
                            </div>

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

                            {/* password input field */}
                            <div className="field">
                                <input 
                                    type="password" 
                                    name="cpassword" 
                                    id="cpassword" 
                                    placeholder=" " 
                                    className='input_field' 
                                    autoComplete="off" 
                                    required 
                                    value={cpassword}
                                    onChange={e => changeHandler(e)}
                                /> 
                                <label htmlFor="cpassword" className='label'>Confirm Password</label>
                            </div>

                            {/* submit button */}
                            <div className='btn_con'>
                                <button type="submit">Sign Up</button>
                            </div>

                            <div className="already">Already have an account? <a href='/login'>Sign In</a></div>
                        </form>
                    </div>
                </div>
            </div>
            
        </Fragment>
    )
}

Signup.propTypes = {
    setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Signup)