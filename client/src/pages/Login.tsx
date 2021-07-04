import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { setAccessToken } from '../accessToken'
import { useLoginMutation } from '../generated/graphql'

const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login] = useLoginMutation()

    const onSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        console.log('Form submitted', email, password)

        try {
            const response = await login({
                variables: { email, password }
            })
            console.log(response)

            if (response && response.data) {
                setAccessToken(response.data.login.accessToken)
            }

        } catch (err) {
            alert(`Login failed: ${err}`)
        }

        // if (response.data && response.data.login.accessToken) {
        //     history.push('/')
        // }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input
                    type='text'
                    placeholder='test@test.com'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='********'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login
