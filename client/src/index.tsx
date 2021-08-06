import React from 'react'
import ReactDOM from 'react-dom'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider } from '@apollo/react-hooks'
import { getAccessToken } from './accessToken'
import App from './App'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import jwtDecode from 'jwt-decode'
import { ApolloLink, Observable, Operation } from 'apollo-link'

const cache = new InMemoryCache()

const request = async (operation: Operation) => {
    const accessToken = getAccessToken()
    operation.setContext({
        headers: {
            authorization: accessToken ? `bearer ${accessToken}` : ''
        }
    })
}

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable(observer => {
            let handle: any
            Promise.resolve(operation)
                .then(oper => request(oper))
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer)
                    })
                })
                .catch(observer.error.bind(observer))

            return () => {
                if (handle) handle.unsubscribe()
            }
        })
)

const apolloLink: any = ApolloLink.from([
    new TokenRefreshLink({
        accessTokenField: 'accessToken',
        isTokenValidOrUndefined: () => {
            const token = getAccessToken()
            if (!token) {
                return true
            }

            try {
                const { exp } = jwtDecode(token)
                if (Date.now() > exp * 1000) {
                    return false
                } else {
                    return true
                }
            } catch {
                return false
            }
        },
        fetchAccessToken: () => {
            return fetch('http://localhost:8000/refresh_token', {
                method: 'POST',
                credentials: 'include'
            })
        },
        handleFetch: accessToken => {
            setAcessToken(accessToken)
        },
        handleError: err => {
            console.warn('Your refresh token is invalid. Try to relogin')
            console.error(err)
        }
    }),
    onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            // sendToLoggingService(graphQLErrors)
            console.log('GraphQL Error', graphQLErrors)
        }
        if (networkError) {
            // logoutUser();
            console.log('Network Error', networkError)
        }
    }),
    requestLink,
    new HttpLink({
        uri: 'http://localhost:8000/graphql',
        credentials: 'include'
    })
])

const client = new ApolloClient({
    link: apolloLink,
    cache,
    resolvers: {
        Mutation: {
            updateNetworkStatus: (_, { isConnected }, { cache }) => {
                cache.writeData({ data: { isConnected } })
                return null
            }
        }
    }
})

cache.writeData({
    data: {
        isConnected: true
    }
})

// const httpLink = createHttpLink({
//     uri: 'http://localhost:8000/graphql'
// })

// const authLink = setContext((_, { headers }) => {
//     const accessToken = getAccessToken()
//     return {
//         headers: {
//             ...headers,
//             authorization: accessToken ? `bearer ${accessToken}` : ''
//         }
//     }
// })

// const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache(),
//     credentials: 'include'
// })

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
