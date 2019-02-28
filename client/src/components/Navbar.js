import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {

    render() {
        return (
            <div>
                <NavLink exact to="/">Home</NavLink>
                <NavLink exact to="/about">About</NavLink>
                <NavLink exact to="/code">Code</NavLink>
                <NavLink exact to="/photos">Photos</NavLink>
                <NavLink exact to="/portfolio">Portfolio</NavLink>
                <NavLink exact to="/contact">Contact</NavLink>
            </div>
        )
    }

}

export default Navbar;