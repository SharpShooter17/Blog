import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

import axios from 'axios';
var querystring = require('querystring');

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      serverMsg: "",
      redirect: 'false',
      logged: 'false',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if ( this.validateEmail(this.state.email) ){
      axios.post('http://localhost/Blog/index.php?/API/UserController/auth', querystring.stringify({
          email: this.state.email,
          password: this.state.password
      }))
      .then(response => {
      	if (response.data.response == "true"){
          this.setState({
            serverMsg: "Jesteś zalogowany: " + response.data.token,
            redirect: 'true'
          });
          Cookies.set('token', response.data.token, {expiries: 1});
          Cookies.set('logged', 'true', {expiries: 1});
        } else {
          this.setState({
            serverMsg: response.data.response
          });
        }
      })
      .catch(error => {
          console.log(error.response);
      });
    }  else {
      this.setState({
        serverMsg: "Nie poprawny EMAIL!"
      });
    }
  }

  updateEmail = e => {
    this.setState({
      email: e.target.value
    });
  }

  updatePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  validateEmail = email => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  render() {
    if ( Cookies.get('logged') == 'true' ) {
      return (<Redirect to="/" />)
    }

    return (
      (this.state.redirect == 'true') ? ( <Redirect to="/" /> ) :
      <div>
        <h1 className="p-5">Zaloguj się</h1>
        <hr />
        <form  onSubmit={this.handleSubmit} className="form-horizontal">
          <fieldset>

          <legend>Logowanie</legend>

          <div className="form-group">
            <label className="col-md-4 control-label" for="textinput">Email:</label>
            <div className="col-md-4">
            <input onChange={this.updateEmail} value={this.state.email} id="textinput" name="textinput" type="text" placeholder="jan.kowalski@poczta.pl" className="form-control input-md" required="" />
            <span className="help-block">Wpisz swój email, który podawałeś przy rejestracji.</span>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="password">Hasło:</label>
            <div className="col-md-4">
              <input onChange={this.updatePassword} value={this.state.password} id="password" name="password" type="password" placeholder="hasło" className="form-control input-md" required="" />
              <span className="help-block">Wpisz hasło.</span>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="login"></label>
            <div className="col-md-8">
              <button onClick={event => {this.onSubmit;}} id="login" name="login" className="btn btn-success">Zaloguj się</button>
            </div>
          </div>

          <div>
            <span className="text-danger">{this.state.serverMsg}</span>
          </div>

          </fieldset>
          </form>
      </div>
    );
  }
}
