import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation() {
    return (
        <nav className="navigation">
            <NavLink
                to="/login"
                activeClassName="navigation__active-link"
            >
                Login Page
            </NavLink>

            <NavLink
                to="/"
                activeClassName="navigation__active-link"
                exact
            >
                Main Page
            </NavLink>

            <NavLink
                to="/fail"
                activeClassName="navigation__active-link"
            >
                Fail Page
            </NavLink>

            <NavLink
                to="/add"
                activeClassName="navigation__active-link"
            >
                Add Page
            </NavLink>
        </nav>
    )
}

export default Navigation