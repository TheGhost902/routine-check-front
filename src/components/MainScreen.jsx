import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { routinesFetched } from '../redux/actionCreators'

const mapDispatchToProps = {
    routinesFetched
}
const mapStateToProps = ({ routines }) => ({routines})

function MainScreen({ routinesFetched, routines }) {
    async function updateData() {
        try {
            const response = await fetch('/test')
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
                    {routines.map((routine, i) => <li key={i}>{routine}</li>)}
                </ul>
            }
            <button onClick={updateData}>Refresh</button>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)