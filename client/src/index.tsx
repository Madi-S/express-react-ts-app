import React from 'react'
import ReactDOM from 'react-dom'
import { InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider } from '@apollo/react-hooks'
import { getAccessToken } from './accessToken'
import App from './App'


const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql'
})

const authLink = setContext((_, { headers }) => {
    const accessToken = getAccessToken()
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `bearer ${accessToken}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: 'include'
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)

// npm -D @types/graphql
