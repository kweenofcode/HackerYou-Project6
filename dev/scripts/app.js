import React from 'react';
import ReactDOM from 'react-dom';
import Recipes from './Recipes';
import SingleRecipe from './SingleRecipe';
import Text from './Text.js';
import {
  BrowserRouter as Router,
  Route, Link, NavLink
} from 'react-router-dom';

class App extends React.Component {
    render() {
      return (
        <Router>
        <div>
          <Route path="/recipes/:recipe_id" component={SingleRecipe} />
          <Route exact path="/" component={app.js} />
          <Route path="/recipes" component={Recipes} />
          <Text />
        </div>
        </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
