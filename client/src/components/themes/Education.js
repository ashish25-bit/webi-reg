import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'

const Education = ({ education }) => {

    const edus = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format='MMM YYYY'>{edu.from}</Moment> - {
                    edu.to !== null ? 
                    <Moment format='MMM YYYY'>{edu.from}</Moment> : 
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
                    <th>School</th>
                    <th>Degree</th>
                    <th>Duration</th>
                    <th>More</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>{edus}</tbody>
        </table>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired
}

export default connect()(Education)
