import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import { useQuery } from '@apollo/react-hooks'
// import { useHelloQuery } from './generated/graphql'

export const Routes: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' render={() => <div>howdy</div>} />
            </Switch>
        </Router>
    )
}
