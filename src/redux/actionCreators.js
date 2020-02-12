import { LOGIN_ACTION, ROUTINES_FETCHED } from './actionTypes'

export const loginAction = userId => ({
    type: LOGIN_ACTION,
    payload: userId
})

export const routinesFetched = arrayOfRoutines => ({
    type: ROUTINES_FETCHED,
    payload: arrayOfRoutines
})