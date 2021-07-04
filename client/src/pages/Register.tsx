import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useRegisterMutation } from '../generated/graphql'

const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [register] = useRegisterMutation()
    const onSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        console.log('Form submitted', email, password)

        try {
            const response = await register({ variables: { email, password } })
            console.log(response)

            if (response.data && response.data.register) {
                history.push('/')
            }
        } catch (err) {
            alert(`Registration failed ${err}`)
        }
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
            <button type='submit'>Register</button>
        </form>
    )
}

export default Register
