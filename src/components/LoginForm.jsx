import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateToken, updateRefreshToken, updateUserId } from '../redux/actionCreators'

const mapDispatchToProps = {
    updateToken,
    updateRefreshToken,
    updateUserId
}

function LoginForm({ updateToken, updateRefreshToken, updateUserId }) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory()

    function changeLogin(e) {
        setLogin(e.target.value)
    }
    function changePassword(e) {
        setPassword(e.target.value)
    }

    async function formSubmit(e) {
        e.preventDefault()

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({login, password})
            })
    
            const data = await response.json()

            if (data.token) {
                updateToken(data.token)
                updateRefreshToken(data.refreshToken)
                updateUserId(data.userId)
                
                history.push('/main')
            } else {
                alert(data.message)
            }
        } catch (err) {
            alert('Network problems, please try again')
        }
    }

    return (
        <>
        <form
            style={{
                border: 'solid black 2px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
            onSubmit={formSubmit}
        >
            <input type="text" placeholder="Login" value={login} onChange={changeLogin}/>
            <input type="password" placeholder="Password" value={password} onChange={changePassword}/>
            <div>
                <button type="submit">Login</button>
            </div>
            
        </form>
        </>
    )
}

export default connect(null, mapDispatchToProps)(LoginForm)