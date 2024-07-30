import Link from 'next/link'
// import styles from './page.module.css'
import Image from 'next/image'
import logo from '../public/images/pbslogo.png'

export default function Home() {
    return (
        <main>
            <section className="card">
                <Image
                    alt="PBS Buildings Logo"
                    src={logo}
                    className="image"
                />
                <h1 className="title">Welcome to the PBS Dealer Application</h1>
                <div className="buttonContainer">
                    <Link href="/login" className="button">Login</Link>
                    <Link href="/register" className="button">Register</Link>
                </div>
            </section>
        </main>
    )
}