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
        tasting_note: '',
        serving_suggestion: '',
        secondary_category: '',
        varietal: '',
        image_url: '',
        image_thumb_url: '',
        style: ''
      }]

    }
  }

  getRandomize(winesArray) {
    return winesArray[Math.floor(Math.random() * 99) + 1];
  }

  async componentDidMount() {

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

      //Promise to return package unit type (can/bottle), total pacakge units (6/package), image_url, price, and producer name
    }).then(async res => {
      console.log(res);
      let curatingArray = [];
      // console.log(res.data.result[0].origin)
      let data = res.data.result;

      for (let i = 0; i < data.length; i++) {
        const curated_dataset = {
          alcohol_content: (data[i].alcohol_content / 100).toString() + "%",
          origin: data[i].origin,
          secondary_category: data[i].secondary_category,
          serving_suggestion: data[i].serving_suggestion,
          style: data[i].style,
          tasting_note: data[i].tasting_note,
          varietal: data[i].varietal,
          image_url: data[i].image_url,
          image_thumb_url: data[i].image_thumb_url,
          key: i
        }
        curatingArray.push(curated_dataset);
      }

      const singleWine = this.getRandomize(curatingArray);
      console.log(singleWine.serving_suggestion);





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
        //Promise to return package unit type (can/bottle), total pacakge units (6/package), image_url, price, and producer name
      }).then(async res => {
        const allIngredients = [];
        allIngredients.push(res.data.annotations[0].spot, res.data.annotations[1].spot)
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
        wines: curatingArray
      })
    });


    


    
  }
  render() {
    return (
      <div className="clear">
        <section className="wineRender">
          <h2>[WINE TITLE]</h2>
        </section>
        <section className="recipesRender">
          <h2>Recipes</h2>
          {this.state.recipes.map((recipe, i) => {
            if(recipe.rating >= 3) {
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
              })}
            </ul>
            <p>{recipe.attributes.course}</p>
            <p>{recipe.sourceDisplayName}</p>
            <p>{recipe.id}</p>
            </div>
            )
            }
          })}
          <p>{this.state.diet.Pescetarian}</p>




          <div className="wineMigrationTest">
          {this.state.wines.map((wine, index) => {
            return <Wine
              key={`${wine.key}${wine.origin}${wine.secondary_category}`}
              alcohol_content={wine.alcohol_content}
              origin={wine.origin}
              secondary_category={wine.secondary_category}
              serving_suggestion={wine.serving_suggestion}
              style={wine.style}
              tasting_note={wine.tasting_note}
              varietal={wine.varietal}
              image_url={wine.image_url}
              image_thumb_url={wine.image_thumb_url}
              testkey={wine.key}
            />
          })}
          </div>
        </section>
      </div>
    )
  }
}

export default Recipes;