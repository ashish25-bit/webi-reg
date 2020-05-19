import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../job/profile'
import ProfileLinks from './ProfileLinks'
import Alert from '../layout/Alert'
import ProfileHead from '../layout/ProfileHead'

const AddEducation = ({ addEducation }) => {

    const [ formData, setFormData ] = useState({
        school: '',
        degree: '',
        from: '',
        to:'',
        location: '',
        current: false,
        description: ''
    })

    const {
        school,
        degree,
        from,
        to,
        location,
        current,
        description
    } = formData

    const [ dateDisabled, toggleDateDisable ] = useState(false)

    const changeHandler = e => setFormData ({ ...formData, [e.target.name] : e.target.value }) 

    const onSubmit = e => {
        e.preventDefault()
        addEducation(formData)
    }

    return (
        <div className='container_logged'>
            <div className='plc'><ProfileLinks /></div>
            <form method='PUT' onSubmit={e => onSubmit(e)} className='profile_form'>
                <ProfileHead head='Add Education' />
                {/* school */}
                <div className='profile_input'>
                    <label>School</label>
                    <input 
                        type='text' 
                        name='school' 
                        value={school}
                        onChange={e => changeHandler(e)}
                        autoComplete='off'
                        required 
                    />
                </div>

                {/* degree */}
                <div className='profile_input'>
                    <label>Degree</label>
                    <input 
                        type='text' 
                        name='degree' 
                        value={degree}
                        onChange={e => changeHandler(e)}
                        autoComplete='off'
                        required 
                    />
                </div>

                {/* date container */}
                <div className='profile_date_con'>
                    {/* from date */}
                    <div className='date_input'>
                        <label>From Date</label><br/>
                        <input 
                        type='text' 
                        name='from' 
                        value={from}
                        onChange={e => changeHandler(e)}
                        autoComplete='off'
                        onFocus={e => e.target.type = 'month'}
                        onBlur={e => e.target.type = 'text'}
                        required 
                    />
                    </div>

                    {/* to date */}
                    <div className='date_input'>
                        <label>To Date</label><br/>
                        <input 
                            type='text' 
                            name='to' 
                            value={to}
                            onChange={e => changeHandler(e)}
                            autoComplete='off'
                            onFocus={e => e.target.type = 'month'}
                            onBlur={e => e.target.type = 'text'}
                            disabled={dateDisabled ? 'disabled' : ''}
                        />
                    </div>

                    {/* current */}
                    <div className="checkbox_con">
                        <input 
                            type='checkbox' 
                            name='current' 
                            className='toDateCheckBox'
                            onChange={e => {
                                setFormData({ ...formData , current : current ? false : true })
                                setFormData({ ...formData, to: '' })
                                toggleDateDisable(!dateDisabled)
                            }}
                        />
                    </div>
                </div>

                {/* location */}
                <div className='profile_input'>
                    <label>Location</label>
                    <input 
                        type='text' 
                        name='location' 
                        value={location}
                        autoComplete='off'
                        onChange={e => changeHandler(e)}
                    />
                </div>

                {/* description */}

                <div className='profile_input'>
                    <label>Description</label>
                    <textarea 
                        name='description' 
                        value={description}
                        onChange={e => changeHandler(e)}
                    >
                    </textarea>
                </div>

                <div className='profile_btn_con'>
                    <button type='submit'>Add Edu</button> {' | '}
                    <a href='/profile'>Go Back</a>
                </div>

                <Alert />
                
            </form>
        </div>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(AddEducation)
