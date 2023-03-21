import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import './navigation.scss'

const Navigation = () => {
  return (
    <header className="main-header">
      <Link to="/">
        <img alt="" src={logo}></img>
      </Link>
      <nav>
        <ul>
          <li></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
