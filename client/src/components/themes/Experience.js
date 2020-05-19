import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'

const Experience = ({ experience }) => {

    const exps = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                    <Moment format='MMM YYYY'>{exp.from}</Moment> - {
                    exp.to !== null ? 
                    <Moment format='MMM YYYY'>{exp.from}</Moment> : 
                    <Fragment>Current</Fragment>
                }
            </td>
            <td>More</td>
            <td>Delete</td>
        </tr>
    ))

    return (
        <table className='edu_exp_table'>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Duration</th>
                    <th>More</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>{exps}</tbody>
        </table>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired
}

export default connect()(Experience)
