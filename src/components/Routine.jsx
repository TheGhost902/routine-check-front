import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

const mapStateToProps = ({ routines }) => ({ routines })
// const mapDispatchToProps = {

// }

function routineHistory(routine) { // -------------------------------------------value can be NaN!!!!!!!!
    const { created, done, value } = routine
    const nowDate = new Date()
    const history = []
    let period = +value

    let day = Math.trunc(new Date(created).getTime()/1000/60/60/24)
    const nowDateDays = Math.trunc(nowDate.getTime()/1000/60/60/24)

    while (day <= nowDateDays) {
        if (done.find(item => Math.trunc(new Date(item).getTime()/1000/60/60/24) === day)) {
            history.push({status: true}) //-------------------------------------------????????
        } else {
            history.push({status: false})
        }

        day += period
    }

    return history
}

function Marker({done}) {
    return (
        <div style={{
            width: 10,
            height: 10,
            backgroundColor: done ? 'green' : 'red',
            margin: 5
        }}></div>
    )
}

function Routine({ routines }) {
    const { id } = useParams()
    const routine = routines.find(item => item._id === id)
    const created = new Date(routine.created)
    const doneFailArr = routineHistory(routine)
    console.log(doneFailArr)

    return (
        <div>
            <div style={{
                display: 'flex'
            }}>
                {doneFailArr.map(item => <Marker done={item.status}/>)}
            </div>
            <hr/>
            <h2>{routine.title}</h2>
            <p>Created: {`${created.getDate()}.${created.getMonth()}.${created.getFullYear()}`}</p>
            <p>Done:  times</p>
            <p>Fail:  times</p>
        </div>
    )
}

export default connect(mapStateToProps, null)(Routine)