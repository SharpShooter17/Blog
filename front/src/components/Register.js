import React, { Component } from 'react';
import axios from 'axios';

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
      msgPassword: ""
    };
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  updateEmail = e => {
    this.setState({
      email: e.target.value
    });
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
    if (
      this.state.password.length >= 8 &&
      this.state.password === this.state.confirmPassword &&
      this.validateEmail(this.state.email)
    ) {
      return true;
    } else {
      return false;
    }
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

  }
};

  wrongRegistrationAlerts() {

  }


  render() {
    return (
      <div>
        <h1>Zarejestruj się</h1>
        <hr />
        <form onSubmit={this._handleSubmit} className="form-horizontal">
          <fieldset>

          <legend>Rejestracja</legend>

          <div className="form-group">
            <label className="col-md-4 control-label" for="email">email</label>
            <div className="col-md-4">
            <input onChange={this.updateEmail} value={this.state.email} id="email" name="email" type="text" placeholder="Jan.Kowalski@poczta.pl" className="form-control input-md" />
            <span className="help-block">{this.state.msgEmail}</span>
            <span className="help-block">Wpisz swój email</span>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="nick">Nick</label>
            <div className="col-md-4">
            <input onChange={this.updateNick} value={this.state.nick} id="nick" name="nick" type="text" placeholder="Mój_nick" className="form-control input-md" />
            <span className="help-block">Wpisz swój unikatowy nick, którym będziesz się posługiwał/a w serwisie</span>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="password">Hasło</label>
            <div className="col-md-4">
              <input onChange={this.updatePassword} value={this.state.password} id="password" name="password" type="password" placeholder="hasło" className="form-control input-md" />
              <span className="help-block">Hasło musi posiadać co najmniej 8 znaków</span>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="confimPassword">Potwierdź hasło</label>
            <div className="col-md-4">
              <input onChange={this.updateConfirmPassword} value={this.state.confimPassword} id="confimPassword" name="confimPassword" type="password" placeholder="hasło" className="form-control input-md" />
              <span className="help-block">Przepisz swoje hasło w celu jego potwierdzenia</span>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="buttonRegister"></label>
            <div className="col-md-8">
              <button onClick={event => {this.onSubmit;}} id="buttonRegister" name="buttonRegister" className="btn btn-success">Zarejestruj się</button>
              <button id="buttonReset" name="buttonReset" className="btn btn-danger">Resetuj</button>
            </div>
          </div>

          </fieldset>
          </form>
      </div>
    );
  }
}
