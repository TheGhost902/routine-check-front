import { LOGIN_ACTION, ROUTINES_FETCHED, ADD_NEW_ROUTINE, DELETE_ROUTINE, START_END_FETCHING } from './actionTypes'

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

export const deleteRoutine = routineId => ({
    type: DELETE_ROUTINE,
    payload: routineId
})

export const startEndFetching = startEnd => ({
    type: START_END_FETCHING,
    payload: startEnd
})