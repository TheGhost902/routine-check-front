import { LOGIN_ACTION, ROUTINES_FETCHED, ADD_NEW_ROUTINE, DELETE_ROUTINE } from './actionTypes'

const initialState = {
    userId: '',
    routines: []
}

const reducer = (state = initialState, action) => {
    console.log(action.type)
    console.log(action.payload)

    switch (action.type) {
        case LOGIN_ACTION:
            return {
                ...state,
                userId: action.payload
            }
        case ROUTINES_FETCHED:
            return {
                ...state,
                routines: action.payload
            }
        case ADD_NEW_ROUTINE:
            return {
                ...state,
                routines: [...state.routines, action.payload]
            }
        case DELETE_ROUTINE:
            return {
                ...state,
                routines: state.routines.filter(routine => routine._id !== action.payload)
            }
    }

    return state
}

export default reducer