import { UPDATE_TOKEN, UPDATE_REFRESH_TOKEN, UPDATE_USER_ID } from './actionTypes'

const initialState = {
    token: '',
    refreshToken: '',
    userId: ''
}

const reducer = (state = initialState, action) => {
    console.log(action.type)
    console.log(action.payload)

    switch (action.type) {
        case UPDATE_TOKEN: {
            return {...state, token: action.payload}
        }
        case UPDATE_REFRESH_TOKEN: {
            localStorage.setItem('refreshToken', action.payload)
            return {...state, refreshToken: action.payload}
        }
        case UPDATE_USER_ID: {
            localStorage.setItem('userId', action.payload)
            return {...state, userId: action.payload}
        }
    }

    return state
}

export default reducer