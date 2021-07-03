import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { useHelloQuery } from './generated/graphql'

function App() {
    const { data, loading } = useHelloQuery()

    if (loading || !data) {
        return <div>Loading...</div>
    }

    return <div>{data.hello}</div>
}

export default App
