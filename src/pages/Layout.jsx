
import { Body } from '../components/Body'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Footer } from '../components/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className='main-app'>
            <div className='header-app'>
                <Header />
            </div>
            <div className="body-app">
                <Sidebar />
                <Outlet />
            </div>
            <div className="footer-app">
                <Footer />
            </div>
        </div>
    )
}
