import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Your Cloud Application',
    description: 'A modern cloud application with authentication',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    )
}