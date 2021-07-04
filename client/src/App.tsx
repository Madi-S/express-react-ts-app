import { useEffect, useState } from 'react'
import { setAccessToken } from './accessToken'
import { Routes } from './Routes'

export interface Props {}

const App: React.FC<Props> = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:8000/refresh_token', {
            method: 'POST',
            credentials: 'include'
        })
            .then(async x => {
                const {ok, accessToken} = await x.json()
                if (ok) {
                    setAccessToken(accessToken)
                }
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div>App is loading ...</div>
    }

    return <Routes />
}

export default App
