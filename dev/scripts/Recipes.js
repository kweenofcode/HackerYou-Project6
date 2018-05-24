import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route, Link, NavLink
} from 'react-router-dom';
import SingleRecipe from './SingleRecipe';
import Wine from './Wine';
import Qs from 'qs';
import regeneratorRuntime from 'regenerator-runtime';

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
      },

      wines: [{
        alcohol_content: 0,
        origin: '',
        name: '',
        tasting_note: '',
        serving_suggestion: '',
        secondary_category: '',
        varietal: '',
        image_url: '',
        image_thumb_url: '',
        style: ''
      }],
      oneWine: ''

    }
  }
  // Get random wine
  getRandomize(winesArray) {
    return winesArray[Math.floor(Math.random() * winesArray.length) + 1];
  }

  async componentDidMount() {
    // LCBO axios call
    await axios({
      method: "GET",
      url: "http://proxy.hackeryou.com",
      dataResponse: "json",
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      params: {
        reqUrl: "http://lcboapi.com/products",
        params: {
          where: "is_vqa", //This will be a variable to search for
          where_not: "is_dead,is_discontinued",
          per_page: 100,
          page: 1
        },
        xmlToJSON: false
      }
      // Return of async promise
    }).then(async res => {
      console.log(res);
      let curatingArray = [];
      // console.log(res.data.result[0].origin)
      let data = res.data.result;
      console.log(data)
      // iterating over array of wines for details
      for (let i = 0; i < data.length; i++) {
        if (data[i].serving_suggestion != null) {
        const curated_dataset = {
          alcohol_content: (data[i].alcohol_content / 100).toString() + "%",
          name: data[i].name,
          origin: data[i].origin,
          secondary_category: data[i].secondary_category,
          serving_suggestion: data[i].serving_suggestion,
          style: data[i].style,
          tasting_note: data[i].tasting_note,
          varietal: data[i].varietal,
          image_url: data[i].image_url,
          image_thumb_url: data[i].image_url,
          key: i
        }
        curatingArray.push(curated_dataset);
      }
      }
      // This gets a produces the single random wine
      const singleWine = this.getRandomize(curatingArray);

      console.log(singleWine.serving_suggestion);
      // This is the Dandelion text API
      await axios({
        method: "GET",
        url: "http://proxy.hackeryou.com",
        dataResponse: "json",
        paramsSerializer: function (params) {
          return Qs.stringify(params, { arrayFormat: "brackets" });
        },
        params: {
          reqUrl: "https://api.dandelion.eu/datatxt/nex/v1",
          params: {
            token: 'bc77fbf397184fc1b069f3085e709f0d',
            text: singleWine.serving_suggestion,
          },
          xmlToJSON: false
        }  
        // Return of promise
      }).then(async res => {
        const allIngredients = [];
        // if (res.data.annotations.length > 1) {
        const filteredArray = res.data.annotations.filter((word) => {
          word.spot !== 'aperitif' && word.spot !== 'patio' && word.spot !== 'appetizers' && word.spot !== 'wine' && word.spot !== 'dark' && word.spot !== 'fresh'
          console.log(word.spot)
          return word
        })
        allIngredients.push(filteredArray[0].spot)
      // } 
        // } else if (res.data.annotations.length > 0) {
        //   allIngredients.push(res.data.annotations[0].spot) 
        // } else {
        //   return
        // }

        const ingredients = allIngredients.join(', ');
        console.log(`ingredients: ${ingredients}`);
        //embedded axios call
        await axios({
          url: 'https://api.yummly.com/v1/api/recipes',
          params: {
            requirepictures: true,
            'allowedCourse': 'course^course-Main Dishes',
            'allowedDiet[]': `${this.state.diet.paleo}`,
            q: `${ingredients}`,
            'allowedAllergy[]': `${this.state.allergies.gluten}`,
            maxResult: 3,
          },
          headers: {
            'X-Yummly-App-ID': "dfbe7dff",
            'X-Yummly-App-Key': '2bccb2cb18b4186352c9c884a2cff49a',
          },
        })
          .then((res) => {
            console.log(res);
            const fullRecipes = res.data.matches;
            fullRecipes.map((recipe) => {
              let smallImage = recipe.smallImageUrls[0]
              recipe.smallImageUrls = smallImage.split('=')[0];
            })
            this.setState({
              recipes: res.data.matches,
            })
          })
        this.setState({
          text: ingredients,
        })
      })
      this.setState({
        wines: curatingArray,
        oneWine: singleWine
      })
    });
  }
  render() {
    return (
      <div className="clear">

        <section className="wineRender">
          <h2>VQA Wine Spotlight</h2>
          <img className="wineImage" src={this.state.oneWine.image_url}></img>
          <h3>{this.state.oneWine.name}</h3>
          <p className="wineOrigin">{this.state.oneWine.origin}</p>
          <p className="wineDesc">{this.state.oneWine.tasting_note}</p>
          <p className="wineTags">{this.state.oneWine.secondary_category} | Alcohol Content: {this.state.oneWine.alcohol_content}| {this.state.oneWine.style}</p>
        </section>

        <section className="recipesRender">
          <h2>Top 3 Curated Dishes</h2>
          {this.state.recipes.map((recipe, i) => {
            if(recipe.rating >= 3) {
              return(
              <div className="recipe" key={recipe.id}>
                <Link to={`recipe/${recipe.id}`}>
                  <img src={recipe.smallImageUrls} alt=""/>
                </Link>
                <h3>{recipe.recipeName}</h3>
                <p className="recipeAuthor">Recipe by: {recipe.sourceDisplayName}</p>
                <p>Ingredients:</p>
                <ul class="ingredientsList clear">{recipe.ingredients.map((ingredient) =>{
                  return (
                      <li>+ {ingredient}</li>
                    )
                  })}
                </ul>
              </div>
              )
            }
          })}
        </section>
      </div>
    )
  }
}

export default Recipes;