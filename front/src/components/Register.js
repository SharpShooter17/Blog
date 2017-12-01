import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
var querystring = require('querystring');
export class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      nick: "",
      msgEmail: "",
      msgNick: "",
      msgConfirmPassword: "",
      msgPassword: "",
      msgFromServer: "",
      redirect: true
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  clearData(){
    this.setState({
      email: "",
      password: "",
      confirmPassword: "",
      nick: "",
      msgEmail: "",
      msgNick: "",
      msgConfirmPassword: "",
      msgPassword: "",
      msgFromServer: ""
    });
  }

  updateEmail = e => {
    this.setState({
      email: e.target.value
    });
    if ( this.validateEmail(e.target.value) ){
      this.setState({
        msgEmail: ""
      });
    } else {
      this.setState({
        msgEmail: "Email nie poprawny!"
      });
    }
  };

  updateNick = e => {
    this.setState({
      nick: e.target.value
    });
  };

  updatePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  updateConfirmPassword = e => {
    this.setState({
      confirmPassword: e.target.value
    });
  };

  validateEmail = email => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  checkConditions = () => {
    if (this.state.password.length < 8){
      this.setState({
        msgPassword: "Hasła jest za krótkie!"
      });
      return false;
    }

    if (this.state.password != this.state.confirmPassword ) {
      this.setState({
        msgConfirmPassword: "Hasła nie są identyczne!"
      });
      return false;
    }

    if ( !this.validateEmail(this.state.email) ) {
      this.setState({
        msgEmail: "Niepoprawny email!"
      });
      return false;
    }

    return true;
  };

  onSubmit = e => {
     e.preventDefault();
     if (!this.checkConditions()) {

     }
   };

   _handleSubmit(e) {
  e.preventDefault();

  if (!this.checkConditions()) {
    this.wrongRegistrationAlerts();
  } else {
    axios.post('http://localhost/Blog/index.php?/API/UserController/addUser', querystring.stringify({
        email: this.state.email,
        nick: this.state.nick,
        password: this.state.password
    }))
    .then(response => {
    	if (response.data.response == "true"){
        this.clearData();
        this.setState({
          msgFromServer: "Rejestracja przebiegła pomyślnie. Możesz się zalogować.",
          redirect: false
        });
        this.redirect();
      } else {
        this.setState({
          msgFromServer: response.data.response
        });
      }
    })
    .catch(error => {
        console.log(error.response)
    });
  }
};

  wrongRegistrationAlerts() {
  }

  render() {
    if ( Cookies.get('logged') == 'true' ) {
      return (<Redirect to="/" />)
    }
    return ( this.state.redirect ?
      <div>
        <h1>Zarejestruj się</h1>
        <hr />
        <form onSubmit={this._handleSubmit} className="form-horizontal">
          <fieldset>

          <legend>Rejestracja</legend>
          <div>
            <span className="text-danger">{this.state.msgFromServer}</span>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" for="email">email</label>
            <div className="col-md-4">
            <input onChange={this.updateEmail} value={this.state.email} id="email" name="email" type="text" placeholder="Jan.Kowalski@poczta.pl" className="form-control input-md" />
            <div className="text-danger">{this.state.msgEmail}</div>
            <span className="help-block">Wpisz swój email</span>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="nick">Nick</label>
            <div className="col-md-4">
            <input onChange={this.updateNick} value={this.state.nick} id="nick" name="nick" type="text" placeholder="Mój_nick" className="form-control input-md" />
            <div className="text-danger">{this.state.msgNick}</div>
            <span className="help-block">Wpisz swój unikatowy nick, którym będziesz się posługiwał/a w serwisie</span>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="password">Hasło</label>
            <div className="col-md-4">
              <input onChange={this.updatePassword} value={this.state.password} id="password" name="password" type="password" placeholder="hasło" className="form-control input-md" />
              <div className="text-danger">{this.state.msgPassword}</div>
              <span className="help-block">Hasło musi posiadać co najmniej 8 znaków</span>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="confimPassword">Potwierdź hasło</label>
            <div className="col-md-4">
              <input onChange={this.updateConfirmPassword} value={this.state.confirmPassword} id="confimPassword" name="confimPassword" type="password" placeholder="hasło" className="form-control input-md" />
              <div className="text-danger">{this.state.msgConfirmPassword}</div>
              <span className="help-block">Przepisz swoje hasło w celu jego potwierdzenia</span>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="buttonRegister"></label>
            <div className="col-md-8">
              <button onClick={event => {this.onSubmit;}} id="buttonRegister" name="buttonRegister" className="btn btn-success">Zarejestruj się</button>
              <button onClick={this.clearData} id="buttonReset" name="buttonReset" className="btn btn-danger">Resetuj</button>
            </div>
          </div>

          </fieldset>
          </form>
      </div> : <Redirect to='login' />
    );
  }
}
