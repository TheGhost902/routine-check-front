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
        <div className="main-screen">
            <h1 className="std-title">All Routines:</h1>

            <hr/>

            {!routines.length ?
                <p className="main-screen__no-routines">
                    There is no Routines
                    <span> (you can <Link to="/add">add some</Link>)</span>
                </p>
                :
                <ul className="main-screen__list">
                    {routines.map(routine =>
                        <li className="main-screen__list-element" key={routine._id}>
                            <Link to={`/routine/${routine._id}`}>{routine.title}</Link>
                            
                            {/* <button onClick={() => deleteSomeRoutine(routine._id)}>delete</button> */}
                            
                        </li>
                    )}
                </ul>
            }

            <hr/>
            
            <button 
                className="std-button main-screen__refresh-button"
                onClick={() => updateRoutinesData(routinesFetched)}
            >
                Refresh
            </button>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)