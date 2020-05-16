import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const Dashboard = props => {

    // changing the document title
    useEffect(() => {document.title = 'Dashboard - WebiReg'},[])

    return (
        <div>
            Dashboard
        </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard
