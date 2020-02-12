import { LOGIN_ACTION, ROUTINES_FETCHED } from './actionTypes'

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

    }

    return state
}

export default reducer