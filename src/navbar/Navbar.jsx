import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({account}) {

        return (
            <nav className='navbar navbar-dark fixed-top shadow p-0 ' style={{backgroundColor: 'black', height:'100px'}}>
                <a style={{color:'white'}} href='https://github.com/Minkun00/Betting'>VOTE FOR LEAGUE OF LEGEND CHAMPIONSHIP KOREA </a>
                <ul>
                    <ul style={{color:'white'}}>
                        Account Number: {account}<br/>   
                    </ul>
                </ul>
                <ul style={{ color: 'white' }}>
                    <Link to='/owner'>
                        <button className="link-button">OWNER PAGE</button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <Link to='/'>
                        <button className="link-button">VOTE PAGE</button>
                    </Link>
                </ul>
            </nav>
        )
}
