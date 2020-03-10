import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginAction } from '../redux/actionCreators'
import toast from './toast'

const mapDispatchToProps = {
    loginAction
}

function LoginForm({ loginAction }) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loginToggle, setLoginToggle] = useState(true)
    let history = useHistory()

    function changeLogin(e) {
        setLogin(e.target.value)
    }
    function changePassword(e) {
        setPassword(e.target.value)
    }
    function changeLoginToggle() {
        setLoginToggle(!loginToggle)
    }
    async function dataFetch(url) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            })
            const data = await response.json()

            if (data.message) {
                toast(data.message.text, data.message.type)
            }

            if (data.userId && response.ok) {
                loginAction(data.userId)
                history.push('/')
            }

        } catch (err) {
            toast('Some Network problems...', 'error')
        }
    }

    function formSubmit(e) {
        e.preventDefault()

        if (loginToggle) {
            dataFetch('/auth/login')
        } else {
            dataFetch('/auth/register')
        }
    }

    return (
        <>
        <form
            className="login-form"
            onSubmit={formSubmit}
        >
            <input type="text" placeholder="Login" value={login} onChange={changeLogin}/>
            <input type="password" placeholder="Password" value={password} onChange={changePassword}/>
            <div>
                <button type="button" onClick={changeLoginToggle}>Login or Register</button>
                <button type="submit">{loginToggle? 'Login' : 'Register'}</button>
            </div>
            
        </form>
        </>
    )
}

export default connect(null, mapDispatchToProps)(LoginForm)