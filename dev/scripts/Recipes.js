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
import Ingredient from './Ingredient';

class Recipes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      q: '',
      diet: '',
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
    console.log(Math.floor((Math.random() * (winesArray.length) - 1) + 1));
      
    return winesArray[Math.floor((Math.random() * (winesArray.length - 1) + 1))]
    // return Math.floor((Math.random() * winesArray.length) + 1);
  }
  async componentDidMount() {
    const diet = `${this.props.diet}`;
    this.setState ({
      diet: diet,
    })
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
      // iterating over array of wines for details
      for (let i = 0; i < data.length; i++) {
        if ((data[i].serving_suggestion != null) && (data[i].image_url != null)) {
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
      console.log(curatingArray)
      
      // This gets a produces the single random wine
      
      let singleWine = this.getRandomize(curatingArray);
      console.log(singleWine);
      
      while (singleWine.image_url == null || singleWine.image_url == ''){
        console.log("reached");
        
        singleWine = this.getRandomize(curatingArray);
      }


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
        console.log(res.data);
        // console.log(text);
        
        // if (res.data.annotations.length > 1) {
        const filteredArray = res.data.annotations.filter((word) => {
          return (word.spot !== 'aperitif') && (word.spot !== 'patio') && (word.spot !== 'appetizers') && (word.spot !== 'wine') && (word.spot !== 'dark') && (word.spot !== 'fresh') && (word.spot !== 'Enjoy') && (word.spot !== 'juicy')//juicy fruits
        })

        let ingredients;
        if(filteredArray.length === 0){
          ingredients = singleWine.serving_suggestion;
        }
        else{
          allIngredients.push(filteredArray[0].spot)
          ingredients = allIngredients.join(', ');

        }

        console.log(`ingredients: ${ingredients}`);
        
        //embedded axios call
        await axios({
          url: 'https://api.yummly.com/v1/api/recipes',
          params: {
            requirePictures: true,
            'allowedCourse': 'course^course-Main Dishes',
            'allowedDiet[]': `${this.state.diet}`,
            q: `${ingredients}`,
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
              // if(recipe.smallImageUrl != null){
                let smallImage = recipe.imageUrlsBySize
                recipe.smallImageUrls = smallImage[90].split('=')[0];
              // }  
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
          return <Wine 
            alcohol_content={this.state.oneWine.alcohol_content}
            name={this.state.oneWine.name}
            image_url={this.state.oneWine.image_url}
            origin={this.state.oneWine.origin}
            secondary_category = {this.state.oneWine.secondary_category}
            style = {this.state.oneWine.style}
            tasting_note={this.state.oneWine.tasting_note}
          />
        </section>

        <section className="recipesRender">
          <h2>Top 3 Paired Dishes</h2>
          {this.state.recipes.map((recipe, i) => {
            if(recipe.rating >= 3) {
              return(
              <div className="recipe" key={recipe.id + recipe.smallImageUrls + recipe.recipeName + recipe.sourceDisplayName}>
                <Link to={`recipe/${recipe.id}`}>
                  <img src={recipe.smallImageUrls} alt=""/>
                </Link>
                <Link to={`recipe/${recipe.id}`}>
                <h3>{recipe.recipeName}</h3>
                </Link>

                <p className="recipeAuthor">Recipe by: {recipe.sourceDisplayName}</p>
                <p>Ingredients:</p>
                <ul className="ingredientsList clear">{recipe.ingredients.map((ingredient) =>{
                  return <Ingredient 
                    key = {ingredient.key + ingredient}
                    ingredient = {ingredient}
                  />
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