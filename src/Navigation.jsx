import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Link to="/">Login Page</Link>
            <Link to="/main">Main Page</Link>
            <Link to="/done">Done Page</Link>
            <Link to="/fail">Fail Page</Link>
        </nav>
    )
}

export default Navigation