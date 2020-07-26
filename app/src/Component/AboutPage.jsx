import React, { useContext } from 'react'
import { Jumbotron, Button } from 'reactstrap';
import { AuthContext } from '../App';
import "./CSS/HomePage.css"

export default function AboutPage() {
    const { state, dispatch } = useContext(AuthContext)
    return (
        <div>
                <h1>{state.user}</h1>
        </div>
    )
}