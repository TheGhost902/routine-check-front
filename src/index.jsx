import React from 'react'
import ReactDOM from 'react-dom'

import LoginForm from './LoginForm'

function App() {
    return (
        <>
            <h1>Hello world!</h1>
            <LoginForm/>
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))