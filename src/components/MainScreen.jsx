import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { routinesFetched } from '../redux/actionCreators'
import { Link } from 'react-router-dom'
import { updateRoutinesData } from '../utils'

const mapDispatchToProps = {
    routinesFetched
}
const mapStateToProps = ({ routines }) => ({routines})

function MainScreen({ routinesFetched, routines }) {
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