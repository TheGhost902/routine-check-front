import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation() {
    let location = useLocation()

    function setActive(path) {
        return location.pathname === path ? 'navigation__active-link' : ''
    }

    return (
        <nav className="navigation">
            <Link
                to="/login"
                className={setActive('/login')}
            >
                Login Page
            </Link>

            <Link
                to="/"
                className={setActive('/')}
            >
                Main Page
            </Link>

            <Link
                to="/fail"
                className={setActive('/fail')}
            >
                Fail Page
            </Link>

            <Link
                to="/add"
                className={setActive('/add')}
            >
                Add Page
            </Link>
        </nav>
    )
}

export default Navigation