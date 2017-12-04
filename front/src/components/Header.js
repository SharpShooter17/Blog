import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

export class Header extends Component {

constructor(props){
  super(props);
  this.handleLogOut = this.handleLogOut.bind(this);
}

handleLogOut(){
  Cookies.remove('token');
  Cookies.remove('logged');
}

render() {
  if (Cookies.get('logged') == 'true'){
    return (
      <ul className="nav">
        <li className="nav-item"><Link className="nav-link" to="/Home">Strona główna</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Users">Użytkownicy</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/ControllPanel">Panel sterowania</Link></li>
        <li className="nav-item"><a onClick={this.handleLogOut} className="nav-link" href="">Wyloguj</a></li>
      </ul>
    )
  }
  return (
      <ul className="nav">
        <li className="nav-item"><Link className="nav-link" to="/Home">Strona główna</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Users">Użytkownicy</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Register">Rejestracja</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/Login">Logowanie</Link></li>
      </ul>
    );
  }
}
