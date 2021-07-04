import React from 'react'
import { Link } from 'react-router-dom'
import { useUsersQuery } from '../generated/graphql'

interface Props {}

const Home: React.FC<Props> = () => {
    const { data } = useUsersQuery({ fetchPolicy: 'network-only' })
    // not reading from cache

    if (!data) {
        return <div>Loading ...</div>
    }

    return (
        <div>
            <div>Users:</div>
            <ul>
                {data.users.map(x => {
                    return (
                        <li key={x.id}>
                            Email: {x.email}, id: {x.id}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Home
