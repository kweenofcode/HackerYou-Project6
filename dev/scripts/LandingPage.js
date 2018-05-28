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
            {name: 'Lacto Vegetarian',
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
            isChecked: false},
      ],
        allergies: {
          gluten: '393^Gluten-Free',
          seafood: '398^Seafood-Free',
          soy: '400^Soy-Free',
          dairy: '396^Dairy-Free',
          egg: '397^Egg-Free',
          nut: '395^Tree Nut-Free',
        },
      }
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(dietName) {
      const dietsClone = Array.from(this.state.diet);
      const itemToRemoveIndex = dietsClone.findIndex((dietItem) => {
        return dietItem.name === dietName;
      });
      dietsClone[itemToRemoveIndex].isChecked = dietsClone[itemToRemoveIndex].isChecked === true ? false : true;
      this.setState({
        diet: dietsClone
      })
      const checkedItems = [];
      this.state.diet.map((diet) => {
        if(diet.isChecked) {
          checkedItems.push(diet.value);
        }
      })
      // this.setState({
      //   isChecked: checkedItems.join(', '),
      // })
      const fullDiet = checkedItems.join(', ');
      this.props.callback(fullDiet);
    }
    render() {
    return (
          <section className="landingPage">
              <div className="landingContent">
                <h1>Wine ON, Dine ON</h1>
                <p className="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. At magni voluptates ipsa nihil quae consectetur nobis, sequi vel fuga doloremque quidem quibusdam nisi praesentium dicta labore iste iusto placeat dolores neque cum? Sapiente eveniet sequi vel fuga doloremque rem vitae? Excepturi, id exercitationem nisi, soluta minima quisquam ducimus quae error, nulla beatae esse laboriosam!</p>
                <form action="">
                  <div>
                    {this.state.diet.map((diet, i) => {
                      return (
                        <React.Fragment>
                          <input type="checkbox" name={diet.name} id={diet.value} value={diet.value} key={i} onChange={() => this.handleChange(diet.name)} />
                          <label htmlFor={diet.value}>{diet.name}</label>
                        </React.Fragment>
                      )
                      } 
                    )}
                  </div>
                  <Link to="/recipes"><button>Explore</button></Link>
                </form>
              </div>
          </section>
        )
      }
}

export default LandingPage