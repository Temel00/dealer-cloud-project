import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import Image from 'next/image'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import CsvWriter from '../../../components/CsvWriter';
import styles from './page.module.css'
import newQuote from '../../../public/images/newQuote.png'
import logo from '../../../public/images/pbslogo.png'
import openFolder from '../../../public/images/openFolder.png'
import builderTrend from '../../../public/images/BuilderTrend.png'
import pbsWebsite from '../../../public/images/pbsWebsite.png'
import atcHazard from '../../../public/images/HazardsATC.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import LogoutButton from '../../../components/LogoutButton';

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    const hasPermission = (requiredLevel) => {
        return session.user.permission >= requiredLevel
    }

    return (
        <main>
            <header>
                <LogoutButton className={styles.leftBox} />
                <h1>Dashboard</h1>
                <div className={styles.rightBox}>
                    <div className={styles.innerBox}>
                        <div className={styles.avatarBox}>
                            <Image
                                alt="PBS Buildings Logo"
                                src={logo}
                                className={styles.avatar}
                            />
                        </div>
                        <p >{session.user.email}</p>
                    </div>
                </div>

            </header>
            <div className='card'>
                {/* <CsvWriter /> */}
                <nav className={styles.buttonCardContainer}>
                    <Link href="/quote" className={styles.buttonCard}>
                        <h3 className={styles.cardTitle}>Create New Quote</h3>
                        <Image
                            alt="PBS Buildings Logo"
                            src={newQuote}
                            className={styles.dashImage}
                        />
                    </Link>
                    <Link href="/quote" className={styles.buttonCard}>
                        <h3 className={styles.cardTitle}>Create New Quote</h3>
                        <Image
                            alt="PBS Buildings Logo"
                            src={newQuote}
                            className={styles.dashImage}
                        />
                    </Link>
                    {hasPermission(5) &&
                        <Link href="/register" className="button">Register</Link>
                    }
                </nav>
            </div>
        </main>

    )
}