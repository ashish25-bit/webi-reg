import React, { useState, useEffect, Fragment } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'

const YourPost = ({ match }) => {

    const [ details, setDetails ] = useState({detail:{}, error: ''})

    useEffect(() => {
        axios.get(`/api/event/id/${match.params.id}`)
        .then(res => {
            console.log(res.data)
            setDetails({...details, detail: res.data, error: ''})
        })
        .catch(err => setDetails({...details, detail: {}, error: err}))
        
    },[match])

    const { detail, error } = details

    return (
        <div className='container_logged'>
            {
                detail ?
                <Fragment>
                    <p>{detail.name}</p>
                    <p>{detail.description}</p>
                </Fragment> :
                <Fragment>{error}</Fragment>
            }
        </div>
    )
}

// YourPost.propTypes = {

// }

export default YourPost
