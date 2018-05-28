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
    this.state ={
      diet: '',
      allergies: ''
    }
    this.getDiet = this.getDiet.bind(this);
    this.getAllergies = this.getAllergies.bind(this);
  }
  getDiet(dietCallback) {
    this.setState ({
      diet: dietCallback,
    })
  }
  //yikes
  getAllergies(allergyCallback) {
    this.setState({
      allergies: allergyCallback
    })
  }



    render() {
      return (
          <div>
            <Router>
              <main className="wrapper">
                <a href="http://www.vqaontario.ca/Home"><img src="../images/VQAlogo.png" alt="VQA Wines of Ontario Logo" className="VQAlogo"/></a>
                <Route exact path="/" render={(props) => <LandingPage {...props} callback={this.getDiet} allergyCallback={this.getAllergies} />} />
                <Route path="/recipe/:recipe_id" component={SingleRecipe} />
                <Route exact path="/recipes" render={(props) => <Recipes {...props} diet={this.state.diet} allergies={this.state.allergies}/>} />
              </main>
            </Router>
          </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));