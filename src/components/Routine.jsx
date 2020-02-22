import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { routineHistory } from '../utils'

const mapStateToProps = ({ routines }) => ({ routines })

function Marker({done, date}) {
    return (
        <div
            style={{
                width: 10,
                height: 10,
                backgroundColor: done ? '#82ff69' : '#ff7a7a',
                margin: 5,
                border: '3px solid black'
            }}
            title={date}
        >
        </div>
    )
}

function Routine({ routines }) {
    const { id } = useParams()
    const routine = routines.find(item => item._id === id)
    const created = new Date(routine.created)
    const doneArr = routineHistory(routine)

    return (
        <div>
            <div style={{
                display: 'flex'
            }}>
                {doneArr.map((item, i) => <Marker key={i} done={item.done} date={item.date}/>)}
            </div>
            <hr/>
            <h2>{routine.title}</h2>
            <p>Created: {`${created.getDate()}.${created.getMonth() + 1}.${created.getFullYear()}`}</p>
            <p>Done: {doneArr.reduce((prev, item) => item.done? ++prev : prev, 0)} times</p>
            <p>Fail: {doneArr.reduce((prev, item) => item.done? prev : ++prev, 0)} times</p>
        </div>
    )
}

export default connect(mapStateToProps, null)(Routine)