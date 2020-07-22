import React, { useState,useContext } from 'react';
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../App';

const NavbarComp = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const {state,dispatch} = useContext(AuthContext)

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink to="/user/register" className='nav-link'>Register</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <Button onClick={()=>dispatch({type:"LOGOUT"})}>
                            {state.isAuthenticated && (
                                "LOGOUT"
                            )}
                        </Button>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComp;