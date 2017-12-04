import React from 'react'
import { Link } from 'react-router-dom'
import Api from './Api'

export class Users extends React.Component {
  componentWillMount(){

  }
  render(){
    return(
      <div className="row">
        <div className="col">
          <h1 className="p-3">Użytkownicy:</h1>
          <hr />

        </div>
      </div>
    )
  }
}
export default Users
