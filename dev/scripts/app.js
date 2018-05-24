import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import Recipes from './Recipes';
import SingleRecipe from './SingleRecipe';
import Text from './Text.js';
import {
  BrowserRouter as Router,
  Route, Link, NavLink
} from 'react-router-dom';
=======
import LandingPage from './LandingPage';
>>>>>>> 4907ae060709cfc58e7f5cca3ec01b07619809dc

class App extends React.Component {
    render() {
      return (
<<<<<<< HEAD
        <Router>
        <div>
          <Route path="/recipes/:recipe_id" component={SingleRecipe} />
          <Route exact path="/" component={app.js} />
          <Route path="/recipes" component={Recipes} />
          <Text />
=======
        <div className="wrapper">
          <LandingPage/>
>>>>>>> 4907ae060709cfc58e7f5cca3ec01b07619809dc
        </div>
        </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));