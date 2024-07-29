import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Welcome to Your Cloud Application</h1>
            <div className={styles.buttonContainer}>
                <Link href="/login" className={styles.button}>Login</Link>
                <Link href="/register" className={styles.button}>Register</Link>
            </div>
        </main>
    )
}