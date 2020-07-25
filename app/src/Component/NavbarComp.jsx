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
import { AuthContext } from '../App';
import "./CSS/Navbar.css"

const NavbarComp = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [LayananisOpen, setLayananIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const Layanantoggle = () => setLayananIsOpen(!LayananisOpen);

    const { state, dispatch } = useContext(AuthContext)

    const history = useHistory();

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
                                <DropdownItem header>Sewa</DropdownItem>
                                <DropdownItem>Gedung Adi Guna</DropdownItem>
                                <DropdownItem>Mobil Jenazah</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem header>Jasa</DropdownItem>
                                <DropdownItem>Perawatan Jenazah</DropdownItem>
                                <DropdownItem>Perabuan/Kremasi</DropdownItem>
                                <DropdownItem>Tanah Bong</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem header>Lain-lain</DropdownItem>
                                <DropdownItem>Ucapan Terima Kasih</DropdownItem>
                                <DropdownItem>Peti Jenazah</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <NavItem className="navitem">
                            <NavLink to="/about" className='nav-link'>Tentang</NavLink>
                        </NavItem>
                        <NavItem className="navitem">
                            <NavLink to="/help" className='nav-link'>Bantuan</NavLink>
                        </NavItem>

                        <NavItem className="navbar-button-group">
                            <NavLink to="/login" className='navbar-button-login'>Masuk</NavLink>
                            {state.isAuthenticated && (
                                <Button color="danger" onClick={() => dispatch({ type: "LOGOUT" })}>
                                    {state.isAuthenticated && (
                                        "Logout"
                                    )}
                                </Button>
                            )}
                            {!state.isAuthenticated && (
                                <Button color="primary" onClick={()=> history.push("/register")}>Daftar</Button>
                            )}
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComp;