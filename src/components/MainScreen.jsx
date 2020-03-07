import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { routinesFetched, deleteRoutine } from '../redux/actionCreators'
import { Link } from 'react-router-dom'
import { updateRoutinesData } from '../utils'
import toast from './toast'

const mapDispatchToProps = {
    routinesFetched,
    deleteRoutine
}
const mapStateToProps = ({ routines }) => ({routines})

function MainScreen({ routinesFetched, deleteRoutine, routines }) {
    async function deleteSomeRoutine(id) {
        try {
            const response = await fetch('/routines', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({routineId: id})
            })
            const parsedResponse = await response.json()

            if (parsedResponse.message) {
                toast(parsedResponse.message.text, parsedResponse.message.type)
            }

            if (parsedResponse.routineId) {
                deleteRoutine(parsedResponse.routineId)
            }

        } catch (err) {
            toast('Some Network problems...', 'error')
        } 
    }

    useEffect(() => {
        updateRoutinesData(routinesFetched)
    }, [])

    return (
        <>
            <h1>Main Screen</h1>
            {!routines.length ?
                <p>No Routines...</p>
                :
                <ul>
                    {routines.map(routine =>
                        <li key={routine._id}>
                            {routine.title}
                            <button onClick={() => deleteSomeRoutine(routine._id)}>delete</button>
                            <Link to={`/routine/${routine._id}`}>more...</Link>
                        </li>
                    )}
                </ul>
            }
            <button onClick={() => updateRoutinesData(routinesFetched)}>Refresh</button>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)