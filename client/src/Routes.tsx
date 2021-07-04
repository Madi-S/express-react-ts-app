import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Bye from './pages/Bye'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

export const Routes: React.FC = () => {
    return (
        <Router>
            <div>
                <header>
                    <div className='home'>
                        <div>
                            <Link to='/'>Home</Link>
                        </div>
                        <div>
                            <Link to='/register'>Register</Link>
                        </div>
                        <div>
                            <Link to='/login'>Login</Link>
                        </div>
                        <div>
                            <Link to='/bye'>Bye</Link>
                        </div>
                    </div>
                </header>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/bye' component={Bye} />
                </Switch>
            </div>
        </Router>
    )
}
