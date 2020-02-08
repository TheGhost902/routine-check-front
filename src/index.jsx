import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import LoginForm from './LoginForm'
import MainScreen from './MainScreen'
import DoneScreen from './DoneScreen'
import FailScreen from './FailScreen'
import Navigation from './Navigation'

function App() {
    return (
        <>
            <Navigation/>
            <Switch>
                <Route path="/done">
                    <DoneScreen/>
                </Route>

                <Route path="/fail">
                    <FailScreen/>
                </Route>

                <Route path="/main">
                    <MainScreen/>
                </Route>

                <Route path="/">
                    <LoginForm/>
                </Route>
            </Switch>
        </>
    )
}

ReactDOM.render(
                <BrowserRouter>
                    <App/>
                </BrowserRouter>,
                document.getElementById('root')
)