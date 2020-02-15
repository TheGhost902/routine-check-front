import { LOGIN_ACTION, ROUTINES_FETCHED, ADD_NEW_ROUTINE } from './actionTypes'

export const loginAction = userId => ({
    type: LOGIN_ACTION,
    payload: userId
})

export const routinesFetched = arrayOfRoutines => ({
    type: ROUTINES_FETCHED,
    payload: arrayOfRoutines
})

export const addNewRoutine = routineData => ({
    type: ADD_NEW_ROUTINE,
    payload: routineData
})