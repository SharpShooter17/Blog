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
  Cookies.remove('id');
}

render() {
  return( <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <Link className="navbar-brand" to='/'>MojBlog.pl</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/">Strona główna</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/Blogs">Blogi</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/Users">Użytkownicy</Link></li>
              {(Cookies.get('logged') != 'true') ?
              <li className="nav-item"><Link className="nav-link" to="/Register">Rejestracja</Link></li> : ''}
              {(Cookies.get('logged') != 'true') ?
              <li className="nav-item"><Link className="nav-link" to="/Login">Logowanie</Link></li>: ''}
              {(Cookies.get('logged') == 'true') ?
              <li className="nav-item"><Link className="nav-link" to="/ControllPanel">Panel sterowania</Link></li> : ''}
              {(Cookies.get('logged') == 'true') ?
              <li className="nav-item"><a onClick={this.handleLogOut} className="nav-link" href="">Wyloguj</a></li> : ''}
              </div>
            </div>
          </nav>
        )
  }
}
