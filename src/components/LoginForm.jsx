import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginAction, startEndFetching } from '../redux/actionCreators'
import toast from './toast'
import Toggle from './Toggle'

const mapDispatchToProps = {
    loginAction,
    startEndFetching
}

function LoginForm({ loginAction, startEndFetching }) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [registerToggle, setRegisterToggle] = useState(false)
    let history = useHistory()

    function changeLogin(e) {
        setLogin(e.target.value)
    }
    function changePassword(e) {
        setPassword(e.target.value)
    }
    function changeRegisterToggle() {
        setRegisterToggle(!registerToggle)
    }
    async function dataFetch(url) {
        startEndFetching(true)
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            })
            const data = await response.json()

            startEndFetching(false)

            if (data.message) {
                toast(data.message.text, data.message.type)
            }

            if (data.userId && response.ok) {
                loginAction(data.userId)
                history.push('/')
            }

        } catch (err) {
            startEndFetching(false)
            toast('Some Network problems...', 'error')
        }
    }

    function formSubmit(e) {
        e.preventDefault()

        if (registerToggle) {
            dataFetch('/auth/register')
        } else {
            dataFetch('/auth/login')
        }
    }

    return (
        <>
        <form
            className="login-form"
            onSubmit={formSubmit}
        >
            <input
                className="login-form__input"
                type="text"
                placeholder="Login"
                value={login}
                onChange={changeLogin}
            />

            <input
                className="login-form__input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={changePassword}
            />

            <Toggle
                preLabel="Login"
                postLabel="Register"
                active={registerToggle}
                toggleFn={changeRegisterToggle}
            />

            <button
                className="std-button login-form__button"
                type="submit"
            >
                Submit
            </button>
        
        </form>
        </>
    )
}

export default connect(null, mapDispatchToProps)(LoginForm)