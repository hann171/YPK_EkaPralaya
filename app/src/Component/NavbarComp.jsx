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
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../App';
import "./CSS/Navbar.css"

const NavbarComp = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [LayananisOpen, setLayananIsOpen] = useState(false);
    const [BantuanisOpen, setBantuanIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const Layanantoggle = () => setLayananIsOpen(!LayananisOpen);
    const Bantuantoggle = () => setBantuanIsOpen(!BantuanisOpen);

    const { state, dispatch } = useContext(AuthContext)

    return (
        <div>
            <Navbar className="Navbar" light expand="md">
                <NavbarBrand href="/">
                    <img src={require('../Assets/Logo-dark.png')} alt="" />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse navbar>
                    <Nav className="mr-auto navbar-option">
                        <Dropdown nav isOpen={LayananisOpen} toggle={Layanantoggle} className="navitem">
                            <DropdownToggle nav caret>
                                Layanan
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Header</DropdownItem>
                                <DropdownItem disabled>Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Another Action</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <NavItem className="navitem">
                            <NavLink to="/about" className='nav-link'>Tentang</NavLink>
                        </NavItem>
                        <Dropdown nav isOpen={BantuanisOpen} toggle={Bantuantoggle} className="navitem">
                            <DropdownToggle nav caret>
                                Bantuan
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Header</DropdownItem>
                                <DropdownItem disabled>Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Another Action</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <NavItem className="navbar-button-group">
                            <NavLink to="/login" className='navbar-button-login'>Masuk</NavLink>
                            <Button onClick={() => dispatch({ type: "LOGOUT" })}>
                                {state.isAuthenticated && (
                                    "LOGOUT"
                                )}
                            </Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComp;