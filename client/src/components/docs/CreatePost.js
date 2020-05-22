import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'react-uuid'
import { Link } from 'react-router-dom'
import { postEvent } from '../../job/event'
import Alert from '../layout/Alert'

const CreatePost = ({postEvent, auth: { user } }) => {

    const [formData, setFormData] = useState({
        name: 'Webinar',
        host: '',
        mail: '',
        description: 'Just A Webinar',
        date: '',
        tag: ''
    })

    const {
        name,
        host,
        mail,
        description,
        date,
        tag
    } = formData

    const [ tags, setTags ] = useState([])

    const [ you, toggleYou ] = useState(false)

    const changeHandler = e => setFormData({...formData, [e.target.name] : e.target.value})

    const eventPost = e => {
        e.preventDefault()
        const sendData = { name, host, mail, description, date, tags }
        postEvent(sendData)
        setFormData({
            ...formData,
            name: '',
            host: '',
            mail: '',
            description: '',
            date: '',
            tag: ''
        })
        setTags([])
    }

    return (
        <div className='container_logged'>
            <form method='POST' onSubmit={e => eventPost(e)} className='profile_form' >
                <h3>Post Event Details</h3>
                {/* name */}
                <div className='event_input'>
                    <label>Event Name</label>
                    <input
                        type='text'
                        name='name'
                        autoComplete='off'
                        required
                        value={name}
                        onChange={e => changeHandler(e)}
                    />
                </div>
                {/* host */}
                <div className='aside_btn_input'>
                    <label>Host</label>
                    <div>
                        <input
                            type='text'
                            name='host'
                            autoComplete='off'
                            required
                            value={host}
                            onChange={e => changeHandler(e)}
                            readOnly={you}
                        />
                        <input type='checkbox'
                            onChange={() => {
                                setFormData({...formData, host: you ? '' : user.name, mail: you ? '' : user.email})
                                toggleYou(!you)
                            }}
                        />
                    </div>
                    <small style={{color: "#757575",fontSize:'12px'}}>Click <strong>You</strong> if you are the host</small>
                </div>
                {/* mail */}
                <div className='event_input'>
                    <label>Email</label>
                    <input
                        type='email'
                        name='mail'
                        autoComplete='off'
                        required
                        value={mail}
                        readOnly={you}
                        onChange={e => changeHandler(e)}
                    />
                </div>
                {/* description */}
                <div className='event_input'>
                    <label>Description</label>
                    <textarea
                        type='text'
                        name='description'
                        autoComplete='off'
                        required
                        value={description}
                        onChange={e => changeHandler(e)}
                    />
                </div>
                {/* date */}
                <div className='event_input'>
                    <label>Date</label>
                    <input
                        type='date'
                        name='date'
                        autoComplete='off'
                        required
                        value={date}
                        onChange={e => changeHandler(e)}
                    />
                </div>
                {/* tags */}
                <div className='aside_btn_input'>
                    <label>Tags</label>
                    <div>
                        <input
                            type='text'
                            name='tag'
                            autoComplete='off'
                            value={tag}
                            onChange={e => changeHandler(e)}
                        />
                        <button 
                            type='button'
                            onClick={() => {
                                const tt = {
                                    id: uuid(),
                                    tag
                                }
                                tag && setTags(tags => [...tags, tt])
                                setFormData({...formData, tag: ''})
                            }}
                        >Add Tag</button>
                    </div>
                </div>
                {/* output tags */}
                <div className='tag_con'>
                    {
                        tags.length ? 
                        <Fragment> {
                            tags.map(tag => <span 
                                    key={tag.id}
                                    id={tag.id} 
                                    className='tag' 
                                    title='Click me to remove me' 
                                    onClick={e => {
                                        const id = e.target.id
                                        setTags(tags => tags.filter(tag => tag.id !== id))
                                    }}
                                    >{tag.tag}
                            </span>)
                        }
                        </Fragment> :
                        <Fragment>No tags until now</Fragment>
                    }
                </div>
                {/* button */}
                <div className='post_event_btn'>
                    <button type='submit'>Post Event Details</button>
                </div>
                {/* alert */}
                <div className="alert-profile"><Alert/></div>
            </form>
            <Link to='/event/posted'>See Posted Events</Link>
        </div>
    )
}

CreatePost.propTypes = {
    auth: PropTypes.object.isRequired,
    postEvent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { postEvent })(CreatePost)