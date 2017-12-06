import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AddBlog from './AddBlog'
import AddCategory from './AddCategory'
import AddArticle from './AddArticle'
import RemoveBlog from './RemoveBlog'
import RemoveCategory from './RemoveCategory'
import RemoveArticle from './RemoveArticle'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

export class ControllPanel extends React.Component {
  render(){
    if (Cookies.get('logged') != 'true'){
      return (<Redirect to="/Login" />)
    }
    return (
      <div>
        <h1 className="p-5">Panel sterowania</h1>
        <hr />
        <h3>Menu:</h3>
        <ul>
          <li><Link to='/ControllPanel/AddBlog'>Dodaj blog</Link></li>
          <li><Link to='/ControllPanel/AddCategory'>Dodaj kategorię</Link></li>
          <li><Link to='/ControllPanel/AddArticle'>Dodaj artykuł</Link></li>
          <li className="text-danger"><Link to='/ControllPanel/RemoveBlog'>Usuń blog</Link></li>
          <li className="text-danger"><Link to='/ControllPanel/RemoveCategory'>Usuń kategorię</Link></li>
          <li className="text-danger"><Link to='/ControllPanel/RemoveArticle'>Usuń artykuł</Link></li>
        </ul>
        <div>
          <Switch>
            <Route exact path='/ControllPanel/AddBlog' component={AddBlog}/>
            <Route exact path='/ControllPanel/AddCategory' component={AddCategory}/>
            <Route exact path='/ControllPanel/AddArticle' component={AddArticle}/>
            <Route exact path='/ControllPanel/RemoveBlog' component={RemoveBlog}/>
            <Route exact path='/ControllPanel/RemoveCategory' component={RemoveCategory}/>
            <Route exact path='/ControllPanel/RemoveArticle' component={RemoveArticle}/>
          </Switch>
        </div>
      </div>
    )
  }
}
