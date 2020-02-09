import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import LoginForm from './components/LoginForm'
import MainScreen from './components/MainScreen'
import DoneScreen from './components/DoneScreen'
import FailScreen from './components/FailScreen'
import Navigation from './components/Navigation'

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
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>,
                document.getElementById('root')
)