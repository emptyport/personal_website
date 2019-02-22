import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {

    render() {
        return (
            <div>
                <NavLink exact to="/">Home</NavLink>
                <NavLink exact to="/about">About</NavLink>
                <NavLink exact to="/contact">Contact</NavLink>
            </div>
        )
    }

}

export default Navbar;