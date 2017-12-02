import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddBlog from './AddBlog'
import AddCategory from './AddCategory'
import AddArticle from './AddArticle'
import { Link } from 'react-router-dom'

export class ControllPanel extends React.Component {
  render(){
    return (
      <div>
        <h1 className="p-5">Panel sterowania</h1>
        <hr />
        <p>
          Witaj w panelu sterowania. <br />
          <ul>
            <li><Link to='ControllPanel/AddBlog'>Dodaj blog</Link></li>
            <li><Link to='ControllPanel/AddCategory'>Dodaj kategorię</Link></li>
            <li><Link to='ControllPanel/AddArticle'>Dodaj artykuł</Link></li>
          </ul>
        </p>
        <div>
          <Switch>
            <Route exact path='/ControllPanel/AddBlog' component={AddBlog}/>
            <Route exact path='/ControllPanel/AddCategory' component={AddCategory}/>
            <Route exact path='/ControllPanel/AddArticle' component={AddArticle}/>
          </Switch>
        </div>
      </div>
    )
  }
}
