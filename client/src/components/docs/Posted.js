import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Posted = ({ auth: { user } }) => {
    return (
        <div className='container_logged'>
            <div className='your_posts_con'>
            <h3>Events posted by {user.name}</h3>
                {
                    user.posted.map(post => (
                        <div className='your-post' key={post.id}>
                            <h3>{post.name}</h3> 
                            <Link to={`/event/posted/${post.id}`}>Edit Webinar Details</Link>
                            <button id={post.id}>Delete This Event</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

Posted.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Posted)
