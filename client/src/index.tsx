import React from 'react'
import ReactDOM from 'react-dom'
import { InMemoryCache, ApolloClient } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App'

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)

// npm -D @types/graphql
