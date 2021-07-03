import React from 'react'
import ReactDOM from 'react-dom'
import { InMemoryCache, ApolloClient } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import { Routes } from './Routes'

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>,
    document.getElementById('root')
)

// npm -D @types/graphql
