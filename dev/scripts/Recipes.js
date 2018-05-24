import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route, Link, NavLink
} from 'react-router-dom';
import SingleRecipe from './SingleRecipe';

class Recipes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      q: '',
      diet: {
        lacto: '388^Lacto vegetarian',
        ovo: '389^Ovo vegetarian',
        pescetarian: '390^Pescetarian',
        vegan: '386^Vegan',
        paleo: '403^Paleo',
      },
      allergies: {
        gluten: '393^Gluten-Free',
        seafood: '398^Seafood-Free',
        soy: '400^Soy-Free',
        dairy: '396^Dairy-Free',
        egg: '397^Egg-Free',
        nut: '395^Tree Nut-Free',
      }
    }
  }
  componentDidMount() {
    axios({
      url: 'https://api.yummly.com/v1/api/recipes',
      params: {
        requirepictures: true,
        'allowedCourse': 'course^course-Main Dishes',
        'allowedDiet[]': `${this.state.diet.paleo}`,
        q: `${this.state.q}`,
        'allowedAllergy[]': `${this.state.allergies.gluten}`,
      },
      headers: {
        'X-Yummly-App-ID': "dfbe7dff",
        'X-Yummly-App-Key': '2bccb2cb18b4186352c9c884a2cff49a',
      },
    })
    .then((res) => {
      const fullRecipes = res.data.matches;
      fullRecipes.map((recipe) => {
        let smallImage = recipe.smallImageUrls[0]
        recipe.smallImageUrls = smallImage.split('=')[0];
      })
      this.setState ({
        recipes: res.data.matches,
      })
    })
  }
  render() {
    return (
      <div>

        <h1>Recipes</h1>
        {this.state.recipes.map((recipe, i) => {
          if(recipe.rating >= 4) {
          return(
          <div key={recipe.id}>
          <Link to={`recipe/${recipe.id}`}>
          <img src={recipe.smallImageUrls} alt=""/>
          </Link>
          <h2>{recipe.recipeName}</h2>
          <p>{recipe.rating}</p>
          <ul>{recipe.ingredients.map((ingredient) =>{
            return (
            <li>{ingredient}</li>)
          })
        }
          </ul>
          <p>{recipe.attributes.course}</p>
          <p>{recipe.sourceDisplayName}</p>
          <p>{recipe.id}</p>
          </div>
          )
          }
        })}
        <p>{this.state.diet.Pescetarian}</p>
      </div>
    )
  }
}

export default Recipes;