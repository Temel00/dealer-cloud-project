'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/images/pbslogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            })

            if (result.error) {
                setError('Invalid email or password')
            } else {
                router.push('/dashboard')
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
        }
    }

    return (
        <main>
            <form className="card" onSubmit={handleSubmit}>
                <Link href="/" className="backButton"><FontAwesomeIcon icon={faArrowLeft} size="1x" /></Link>
                <Image
                    alt="PBS Buildings Logo"
                    src={logo}
                    className="image"
                />
                <h1 className="title">Login</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="container">
                    <div className="textInput">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="textInput">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button className="button" type="submit">Login</button>
            </form>
        </main>
    )
}