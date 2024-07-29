'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
    console.log('Register component rendered')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (response.ok) {
                router.push('/login')
            } else {
                const data = await response.json()
                setError(data.message || 'Something went wrong')
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Register</button>
        </form>
    )
}