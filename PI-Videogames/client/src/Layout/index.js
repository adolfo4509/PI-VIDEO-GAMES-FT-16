
import { useLocation } from 'react-router-dom'
import Nav from '../Nav/Nav'
import './layout.css'
import Header from '../Header/Header'
const Layout = ({ children }) => {
    const isLandingPage = useLocation().pathname === '/'

    return (
        <section id="page" className={isLandingPage ? 'landing-page' : ''}>
            {!isLandingPage && <header><Header /></header>}
            {!isLandingPage && <nav><Nav /></nav>}
            <main>{children}</main>
        </section>
    )
}

export default Layout
