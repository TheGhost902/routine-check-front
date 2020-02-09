import { useState, useCallback } from 'react'
import store from '../redux/store'
import { updateToken, updateRefreshToken } from '../redux/actionCreators'

export function useGetData() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url) => {
        setLoading(true)
        const { token, refreshToken, userId } = store.getState()

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({token, userId})
            })

            if (response.status === 401) {
                response = await fetch('/auth/refreshtokens', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({refreshToken})
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong')                    
                }

                store.dispatch(updateToken(data.token))
                store.dispatch(updateRefreshToken(data.refreshToken))

                response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: store.getState().token,
                        userId})
                })

                return await response.json()
            }

            setLoading(false)
            return await response.json()

        } catch (err) {
            setLoading(false)
            setError(err)
        }
    }, [])

    const clearError = useCallback(() => {setError(null)}, [])

    return {
        request,
        loading,
        error,
        clearError
    }
}