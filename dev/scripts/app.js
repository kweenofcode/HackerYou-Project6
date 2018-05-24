import React from 'react';
import ReactDOM from 'react-dom';
import Recipes from './Recipes';
import SingleRecipe from './SingleRecipe';
import Text from './Text.js';
import {
  BrowserRouter as Router,
  Route, Link, NavLink
} from 'react-router-dom';
import LandingPage from './LandingPage';

class App extends React.Component {
  constructor(){
    super();
  }


    render() {
      return (
        <div> 
        <Router>
          <div>
            <Route path="/recipe/:recipe_id" component={SingleRecipe} />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/recipes" component={Recipes} />
          </div>
        </Router>
        <div>
          {}
        <div className="wrapper">
        </div>
      </div>
      </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));