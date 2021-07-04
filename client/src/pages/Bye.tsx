import React from 'react'
import { useByeQuery } from '../generated/graphql'

interface Props {}

const Home: React.FC<Props> = () => {
    // bye data is protected with authentication
    const { data, loading, error } = useByeQuery()

    if (loading) {
        return <div>Loading ...</div>
    }

    if (error) {
        console.log(error)
        return <div>Error: {JSON.stringify(error)}</div>
    }

    if (!data) {
        return <div>No data</div>
    }

    return <div>Bye Data: {JSON.stringify(data)}</div>
}

export default Home
