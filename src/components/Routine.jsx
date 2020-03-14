import React from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { routineHistory, deleteRoutineFetch } from '../utils'
import { deleteRoutine } from '../redux/actionCreators'

const mapStateToProps = ({ routines }) => ({ routines })

const mapDispatchToProps = {
    deleteRoutine
}

function Marker({done, date}) {
    return (
        <div 
            className="std-markers__item"
            style={{
                backgroundColor: done ? '#82ff69' : '#ff7a7a'
            }}
            title={date}
        >
        </div>
    )
}

function Routine({ routines, deleteRoutine }) {
    const { id } = useParams()
    const history = useHistory()
    const routine = routines.find(item => item._id === id)
    const created = new Date(routine.created)
    const doneArr = routineHistory(routine)

    async function deleteButtonHandler() {
        const deletedId = await deleteRoutineFetch(id)

        if (deletedId) {
            history.push('/')
            deleteRoutine(deletedId)
        }
    }

    return (
        <div className="routine">
            <div className="std-markers routine__markers">
                {doneArr.map((item, i) => <Marker key={i} done={item.done} date={item.date}/>)}
            </div>

            <hr/>

            <h1 className="std-title routine__title">{routine.title}</h1>

            <hr/>

            <p>Created: {`${created.getDate()}.${created.getMonth() + 1}.${created.getFullYear()}`}</p>
            <p>Done: <span className="routine__done">{doneArr.reduce((prev, item) => item.done ? ++prev : prev, 0)}</span> times</p>
            <p>Fail: <span className="routine__fail">{doneArr.reduce((prev, item) => item.done? prev : ++prev, 0)}</span> times</p>

            <hr/>

            <button className="std-button routine__delete-button" onClick={deleteButtonHandler}>Delete</button>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Routine)