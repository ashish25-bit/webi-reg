import React, { Fragment } from 'react'
import uuid from 'react-uuid'
import Moment from 'react-moment'

const Events = ({ events }) => {
    return (
        <Fragment>
            {
                events.map(event => (
                    <div key={uuid()} className='event'>
                        <h4>{event.name}</h4>
                        <p className='hosted-by'>Hosted By - {event.host} on {' '}
                            <Moment format='MMM D, YYYY'>{event.date}</Moment>
                        </p>
                        <p className='mail-event'>Email : {event.mail}</p>
                        <p className='des-event'>{event.description}</p>
                        {
                            event.tags.length!==0 && <div className='event-tag-con'>
                                { event.tags.map(tag => <span key={tag.id}>{tag.tag}</span>) }
                            </div>
                        }
                        <p className='posted-on-event'>Posted On - {' '}
                            <Moment format='MMM D, YYYY'>{event.postedOn}</Moment>
                        </p>
                    </div>
                ))
            }
        </Fragment>
    )
}

export default Events