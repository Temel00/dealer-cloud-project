import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import CsvWriter from '../../../components/CsvWriter';

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {session.user.email}</p>
            <CsvWriter />
            <h3>This is an update to the application</h3>
        </div>
    )
}