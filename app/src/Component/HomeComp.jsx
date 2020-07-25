import React, { useContext } from 'react'
import { Jumbotron, Button } from 'reactstrap';
import { AuthContext } from '../App';
import "./CSS/HomePage.css"

export default function HomeComp() {
    const { state, dispatch } = useContext(AuthContext)
    function mouseHover(e) {
        e.target.style.background = '#046ac4';
    }
    function mouseHoverLeave(e) {
        e.target.style.background = '#098AFB';
    }
    return (
        <div>
            <div>
                <h1>{state.user}</h1>
                <p className="ypkText">YAYASAN PEMBANTU KEMATIAN</p>
                <h1 className="ekpText">EKA PRALAYA</h1>
                <div className="boxSejarah">
                    <p> Berdiri sejak ..... dimana kami memberikan pelayanan
                    untuk membantu anda dan keluarga dalam proses
                    penanganan kematian dan pemakaman.</p>
                </div>
                <button className="btninfo" onMouseOver={mouseHover} onMouseLeave={mouseHoverLeave}>Info lebih lanjut</button>
            </div>
            <div className="gambarBebek">
                <img src={require('../Assets/dove.png')} alt="" />
            </div>
        </div>
    )
}
