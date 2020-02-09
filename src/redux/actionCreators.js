import { UPDATE_TOKEN, UPDATE_REFRESH_TOKEN, UPDATE_USER_ID } from './actionTypes'

export const updateToken = token => ({
    type: UPDATE_TOKEN,
    payload: token
})

export const updateRefreshToken = token => ({
    type: UPDATE_REFRESH_TOKEN,
    payload: token
})

export const updateUserId = id => ({
    type: UPDATE_USER_ID,
    payload: id
})