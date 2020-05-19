import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../job/profile'
import ProfileLinks from './ProfileLinks'
import Alert from '../layout/Alert'
import ProfileHead from '../layout/ProfileHead'

const AddExperience = ({ addExperience }) => {

    const [ formData, setFormData ] = useState({
        title: 'Teacher',
        company: 'SRMIST',
        from: ' ',
        to:' ',
        location: '',
        current: false,
        description: ''
    })

    const {
        title,
        company,
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
        console.log(formData)
        addExperience(formData)
    }

    return (
        <div className='container_logged'>
            <div className='plc'><ProfileLinks /></div>
            <form method='PUT' onSubmit={e => onSubmit(e)} className='profile_form'>
                <ProfileHead head='Add Experience' />
                {/* title */}
                <div className='profile_input'>
                    <label>Title</label>
                    <input 
                        type='text' 
                        name='title' 
                        value={title}
                        onChange={e => changeHandler(e)}
                        autoComplete='off'
                        required 
                    />
                </div>

                {/* company */}
                <div className='profile_input'>
                    <label>Company</label>
                    <input 
                        type='text' 
                        name='company' 
                        value={company}
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
                    <button type='submit'>Add Exp</button>{' | '}
                    <a href='/profile'>Go Back</a>
                </div>

                <Alert />
                
            </form>
        </div>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(AddExperience)
