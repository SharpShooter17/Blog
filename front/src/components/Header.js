import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export const Header = () => (
      <ul className="nav">
        <li className="nav-item"><Link className="nav-link" to="/home">Strona główna</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/register">Rejestracja</Link></li>
        <li className="nav-item"><Link className="nav-link" to="login">Logowanie</Link></li>
      </ul>
    );
