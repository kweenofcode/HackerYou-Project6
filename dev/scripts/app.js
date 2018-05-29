import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';
import Recipes from './Recipes';
import SingleRecipe from './SingleRecipe';
import {
  BrowserRouter as Router,
  Route, Link, NavLink, Switch
} from 'react-router-dom';
import LandingPage from './LandingPage';

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      diet: '',
      allergies: '',
    }
    this.getDiet = this.getDiet.bind(this);
    this.getAllergies = this.getAllergies.bind(this);
    this.clearDietAndAllergies = this.clearDietAndAllergies.bind(this);
    
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

  clearDietAndAllergies(dietToClear, allergyToClear){
    this.setState({
      allergies: allergyToClear,
      diet: dietToClear
    })
  }


    render() {
      //move this to render in app
      return (
          <div>
            <Router>
              <main className="wrapper">
                <a href="http://www.vqaontario.ca/Home"><img src="../images/VQAlogo.png" alt="VQA Wines of Ontario Logo" className="VQAlogo"/></a>
                <Route render={({location}) => ( 
                <TransitionGroup>
                  <CSSTransition classNames="fade" key={location.key} timeout={1000}>
                    <Switch location={location}>
                      <Route exact path="/" render={(props) => <LandingPage {...props} callback={this.getDiet} allergyCallback= {this.getAllergies} />} />
                      <Route path="/recipe/:recipe_id" component={SingleRecipe} />
                  {/* Cleardiets goe to recipes */}
                      <Route exact path="/recipes" render={(props) => <Recipes {...props} clearDietAndAllergies={this.clearDietAndAllergies}   diet={this.state.diet} allergies={this.state.allergies}/>} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
                )}/>
              </main>
            </Router>
          </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));