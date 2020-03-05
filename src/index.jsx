import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import LoginForm from './components/LoginForm'
import MainScreen from './components/MainScreen'
import FailScreen from './components/FailScreen'
import Navigation from './components/Navigation'
import AddScreen from './components/AddScreen'
import Routine from './components/Routine'
import LoadingWheel from './components/LoadingWheel'

function App() {
    return (
        <>
            <button onClick={() => {console.log(store.getState())}}>STORE</button>
            <LoadingWheel/>
            <Navigation/>
            <hr/>
            
            <Switch>
                
                <Route path="/login">
                    <LoginForm />
                </Route>

                <Route path="/fail">
                    <FailScreen />
                </Route>

                <Route path="/add">
                    <AddScreen />
                </Route>

                <Route path="/routine/:id">
                    <Routine />
                </Route>

                <Route path="/">
                    <MainScreen />
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