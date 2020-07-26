import React, { useContext } from 'react'
import { Jumbotron, Button } from 'reactstrap';
import { AdminAuthContext } from '../App';
import "./CSS/HomePage.css"

export default function Anggota() {
    const { state, dispatch } = useContext(AdminAuthContext)
    return (
        <div>
                <h1>{state.user}</h1>
        </div>
    )
}