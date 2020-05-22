import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Posted = ({ auth: { user } }) => {
    return (
        <div className='container_logged'>
            {
                user.posted.map(post => <p key={post.id} id={post.id}>{post.name}</p> )
            }
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
