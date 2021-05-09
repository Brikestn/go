import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Menu } from 'semantic-ui-react'
import NavBrand from './nav-brand.component';
import MobileNavToggler from './nav-toggler.component';
import 'bootstrap/dist/css/bootstrap.min.css';

class TopNavbar extends Component {
    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <NavBrand text="React Router Example" />

                <MobileNavToggler />

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" exact activeClass="active">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/addtable" exact activeClass="active">
                                Table
                            </NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact" activeClass="active">
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default TopNavbar;