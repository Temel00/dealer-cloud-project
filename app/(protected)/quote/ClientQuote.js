"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'


export default function ClientQuote({ session }) {
    const [allValues, setAllValues] = useState({
        projectName: '',
        contactName: '',
    });
    const changeHandler = e => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }

    return (
        <main>
            <header>
                <Link href="/dashboard" className={styles.leftBox}><FontAwesomeIcon icon={faHouse} size="2x" /></Link>
                <h1>Quote Input</h1>
                <p className={styles.rightBox}>Welcome, {session.user.email}</p>
            </header>
            <div className={styles.inputBody}>
                <nav className={styles.sidebar}>
                    <button>Project Information</button>
                    <button>Design Codes</button>
                    <button>Project Layout</button>
                    <button>Main Building</button>
                    <button>Options</button>
                    <button>Cranes</button>
                    <button>Mezzanines</button>
                    <button>Partitions</button>
                    <button>Openings</button>
                    <button>Finalize</button>
                </nav>
                <div className={styles.sectionContainer}>
                    <section id="projectInfo">
                        <input type="text"
                            className={styles.textInput}
                            id="projectName"
                            name="projectName"
                            placeholder="Project Name"
                            onChange={changeHandler}
                        />
                    </section>
                </div>
            </div>
        </main>
    )
}
