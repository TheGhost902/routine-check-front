import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { routineHistory, createFormattedDate, updateRoutinesData } from '../utils'
import { routinesFetched } from '../redux/actionCreators'
import toast from './toast'

const mapStateToProps = ({ routines }) => ({ routines })
const mapDispatchToProps = {
    routinesFetched
}
 
function FailScreen({ routines, routinesFetched }) {
    useEffect(() => {updateRoutinesData(routinesFetched)}, [])

    // get today routines
    const todayArr = routines.map(routine => {
        const history = routineHistory(routine)
        if (new Date(routine.done[routine.done.length -1]).getTime() === new Date(createFormattedDate()).getTime()) {
            return false
        }
        if (new Date(history[history.length - 1].date).getTime() === new Date(createFormattedDate()).getTime()) {
            return {title: routine.title, id: routine._id}
        }
        return false
    }).filter(item => item !== false)
    
    async function doneRoutine(routineId) {
        try {
            const response = await fetch('/routines/done', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({routineId})
            })
            const data = await response.json()

            if (data.message) toast(data.message.text, data.message.type)

            if (data.routine) {
                updateRoutinesData(routinesFetched)
            }
        } catch (err) {
            console.log(err)
            toast('Some Network Problems', 'error')
        }
    }

    return (
        <>
            <h1>Fail Screen</h1>
            <h2>Today:</h2>
            <ul>
                {todayArr.map(item =>
                    <li key={item.id}>
                        <Link to={'/routine/' + item.id}>{item.title}</Link>
                        <button onClick={() => doneRoutine(item.id)}>Done</button>
                    </li>
                )}
            </ul>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FailScreen)