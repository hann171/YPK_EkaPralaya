import React, { useState, useContext } from 'react';
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom'
import { AdminAuthContext } from '../App';
import "./CSS/NavbarAdmin.css"

const NavbarComp = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const { state, dispatch } = useContext(AdminAuthContext)

    const history = useHistory();

    return (
        <div className="wrapper">
            <Navbar className="sidebar" aria-orientation="vertical">
            </Navbar>
            <Navbar className="Navbar nav-layout" aria-orientation="horizontal" light expand="md">
                <NavbarBrand href="/admin/home">
                    <img src={require('../Assets/Logo-dark.png')} alt="" />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse navbar>
                    <Nav className="mr-auto navbar-option-admin">
                        <NavItem className="navitemAdmin">
                            <NavLink to="/admin/anggota" className='nav-link'>Keanggotaan</NavLink>
                        </NavItem>
                        <NavItem className="navitemAdmin">
                            <NavLink to="/" className='nav-link'>Berita Duka</NavLink>
                        </NavItem>
                        <NavItem className="navitemAdmin">
                            <NavLink to="/" className='nav-link'>Content</NavLink>
                        </NavItem>

                        <NavItem className="greeting">
                            {state.isAdminAuthenticated && (
                                <div>
                                    <a className="greet">Halo, {state.user}</a>
                                    <Button color="danger" onClick={() => dispatch({ type: "LOGOUT" })}>
                                    LOGOUT
                                </Button>
                                </div>
                            )}
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComp;