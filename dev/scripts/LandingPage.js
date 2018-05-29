import React from 'react';
import {
  BrowserRouter as Router,
  Route, Link, NavLink
} from 'react-router-dom';


class LandingPage extends React.Component {
    constructor() {
      super();
      this.state = {
        isChecked: [],
        diet: [
          { name: 'Lacto Vegetarian',
            value: '388^Lacto vegetarian',
            isChecked: false},
          { name: 'Ovo Vegetarian',
            value: '389^Ovo vegetarian',
            isChecked: false},
          { name: 'Pescetarian',
            value: '390^Pescetarian',
            isChecked: false},
          { name: 'Vegan',
            value: '386^Vegan',
            isChecked: false},
          { name: 'Paleo',
            value: '403^Paleo',
            isChecked: false}
        ],
        allergies: [
        { name: 'gluten',
          value: '393^Gluten-Free',
          isChecked: false },
        { name: 'seafood',
          value: '398^Seafood-Free',
          isChecked: false },
        { name: 'soy',
          value: '400^Soy-Free',
          isChecked: false },
        { name: 'dairy',
          value: '396^Dairy-Free',
          isChecked: false },
        { name: 'egg',
          value: '397^Egg-Free',
          isChecked: false },
        { name: 'nut',
          value: '395^Tree Nut-Free',
          isChecked: false }
        ],
      }
      this.handleAllergyChange = this.handleAllergyChange.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    //needs to be its separate thing unless we pass the entire checkbox array
    handleAllergyChange(allergyName) {
      const allergiesClone = Array.from(this.state.allergies);
      const allergyToRemoveIndex = allergiesClone.findIndex((allergyItem) => {
        return allergyItem.name === allergyName;
      });
      allergiesClone[allergyToRemoveIndex].isChecked = allergiesClone[allergyToRemoveIndex].isChecked === true ? false : true;
      this.setState({
        allergies: allergiesClone
      })
      const allergyItems = [];  
      this.state.allergies.map((allergy) => {
        if (allergy.isChecked) {
          allergyItems.push(allergy.value);
        }
      })
      const fullAllergies = allergyItems.join(', ');
      this.props.allergyCallback(fullAllergies);
      console.log(`Allergies: ${fullAllergies}`);

    }


    handleChange(dietName) {
      const dietsClone = Array.from(this.state.diet);
      const itemToRemoveIndex = dietsClone.findIndex((dietItem) => {
        return dietItem.name === dietName;
      });
      dietsClone[itemToRemoveIndex].isChecked = dietsClone[itemToRemoveIndex].isChecked === true ? false : true;
      this.setState({
        diet: dietsClone,
      })
      const dietItems = [];
      
      this.state.diet.map((diet) => {
        if(diet.isChecked) {
          dietItems.push(diet.value);
        }
      })
      const fullDiet = dietItems.join(', ');
      this.props.callback(fullDiet);
      console.log(`Diet: ${fullDiet}`);
      
    }
    render() {
    return (
          <section className="landingPage">
              <div className="landingContent">
                <h1>Wine ON <span>Dine ON</span></h1>
                <p className="desc">Whether it's been a long week or about to be a long weekend, you deserve to unwind. Using a highly scientific algorithm Wine ON, Dine ON pairs the finest VQA wines with complementary recipes. So whether it's a special occasion or just another Friday night with the cats, Wine On Dine On has you covered.</p>
                <form action="">
                  <div className="clear">
                    <p>Select dietary-restrictions:</p>
                    {this.state.diet.map((diet, i) => {
                      return (
                        <React.Fragment>
                          <input type="checkbox" name={diet.name} id={diet.value} value={diet.value} key={i + diet.name + diet.value + diet} onChange={() => this.handleChange(diet.name)} />
                          <label htmlFor={diet.value}>{diet.name}</label>
                        </React.Fragment>
                      )
                      } 
                    )}
                  </div>
                  <div>
                    <p>Select allergy-restrictions:</p>
                    {this.state.allergies.map((allergy, i) => {
                      return (
                        <React.Fragment>
                          <input type="checkbox" name={allergy.name} id={allergy.value} value={allergy.value} key={i + allergy.name + allergy.value + allergy} onChange={() => this.handleAllergyChange(allergy.name)} />
                          <label htmlFor={allergy.value}>{allergy.name}</label>
                        </React.Fragment>
                      )
                    }
                    )}
                  </div>
                  <Link to="/recipes">Explore</Link>
                </form>
                <p>&copy; 2018 Becky Pollard, Michael Yiu and Ky Capstick</p>
              </div>
          </section>
        )
      }
}

export default LandingPage