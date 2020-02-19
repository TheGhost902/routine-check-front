import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { routinesFetched, deleteRoutine } from '../redux/actionCreators'
import { Link } from 'react-router-dom'

const mapDispatchToProps = {
    routinesFetched,
    deleteRoutine
}
const mapStateToProps = ({ routines }) => ({routines})

function MainScreen({ routinesFetched, deleteRoutine, routines }) {
    async function updateData() {
        try {
            const response = await fetch('/routines')
            const parsedResponse = await response.json()

            if (parsedResponse.message) {
                alert(parsedResponse.message)
            }

            if (parsedResponse.routines) {
                routinesFetched(parsedResponse.routines)
            }
        } catch (err) {
            alert('Some Network problems...')
        }
    }
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
                alert(parsedResponse.message)
            }

            if (parsedResponse.routineId) {
                deleteRoutine(parsedResponse.routineId)
            }

        } catch (err) {
            alert('Some Network problems...')
        } 
    }

    useEffect(() => {
        updateData()
    }, [])

    return (
        <>
            <h1>Main Screen</h1>
            {!routines.length ?
                <p>Loading...</p>
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
            <button onClick={updateData}>Refresh</button>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)