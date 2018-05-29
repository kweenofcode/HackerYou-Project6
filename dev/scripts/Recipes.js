import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route, Link, NavLink
} from 'react-router-dom';
import regeneratorRuntime from 'regenerator-runtime';
import SingleRecipe from './SingleRecipe';
import Wine from './Wine';
import Qs from 'qs';
import Ingredient from './Ingredient';

class Recipes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      q: '',
      allergies: '',
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
    // push to Recipes
    // this.clearDietAndAllergies = this.clearDietAndAllergies.bind(this);
    this.clear = this.clear.bind(this);
    this.tripleAxios = this.tripleAxios.bind(this);
    this.wineAxios = this.wineAxios.bind(this);
    this.dandelionAxios = this.dandelionAxios.bind(this);
    this.yummlyAxios = this.yummlyAxios.bind(this);
  }

  //push this to Recipes
  clear() {
    this.setState({
      diet: '',
      allergies: '',
    }, 
     () => {
       this.props.clearDietAndAllergies(`${this.state.diet}`, `${this.state.allergies}`)
       this.props.history.push('/');      
     }
   )
    // console.log(this.state.diet);
  }

  // Get random wine
  getRandomize(winesArray) {
    return winesArray[Math.floor((Math.random() * (winesArray.length - 1) + 1))]
  }


  async wineAxios(){
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
      let curatingArray = [];
      let data = res.data.result;
      // iterating over array of wines for details
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].name);
        
        if ((data[i].serving_suggestion != null) && (data[i].image_url != null) && (data[i].name !== "Sandbanks Dunes White VQA")) {
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
      // console.log(curatingArray);

      // This gets a produces the single random wine
      let singleWine = this.getRandomize(curatingArray);

      while (singleWine.image_url == null || singleWine.image_url == '') {
        singleWine = this.getRandomize(curatingArray);
      }
      this.setState({
        wines: curatingArray,
        oneWine: singleWine,
      })
    })
  }
  async dandelionAxios(){
    // This is the Dandelion text API
    console.log(this.state.oneWine.serving_suggestion);

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
          token: '540e6dac085d4124a024fec1f838c97b',
          text: this.state.oneWine.serving_suggestion,
        },
        xmlToJSON: false
      }
      // Return of promise
    }).then(async res => {
      const allIngredients = [];
      const filteredArray = res.data.annotations.filter((word) => {
        return (word.spot !== 'aperitif') && (word.spot !== 'patio') && (word.spot !== 'appetizers') && (word.spot !== 'wine') && (word.spot !== 'dark') && (word.spot !== 'fresh') && (word.spot !== 'Enjoy') && (word.spot !== 'juicy')//juicy fruits
      })

      let ingredients;
      if (filteredArray.length === 0) {
        ingredients = this.state.oneWine.serving_suggestion;
      }
      else {
        allIngredients.push(filteredArray[0].spot)
        ingredients = allIngredients.join(', ');
      }
      this.setState({
        text: ingredients,
      })
    })
  }

  async yummlyAxios(){
    //embedded axios call
    await axios({
      url: 'https://api.yummly.com/v1/api/recipes',
      params: {
        requirePictures: true,
        'allowedCourse': 'course^course-Main Dishes',
        'allowedAllergy[]': `${this.state.allergies}`,
        'allowedDiet[]': `${this.state.diet}`,
        q: `${this.state.text}`,
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
          let smallImage = recipe.imageUrlsBySize
          recipe.smallImageUrls = smallImage[90].split('=')[0];
        })
        this.setState({
          recipes: res.data.matches,
        })
      }, (err) => {
        console.log(err);
        
      })
  }


  async tripleAxios() {
    
    
    await this.wineAxios();
    await this.dandelionAxios();
    await this.yummlyAxios();
 

  }

  async componentDidMount() {
    await this.tripleAxios();
    const diet = `${this.props.diet}`;
    const allergies = `${this.props.allergies}`;

   
    console.log("mounted");

    this.setState({
      allergies: allergies,
      diet: diet
    })

    
  }




  
  render() {
    return (
      <div className="clear">
        <section>
          {/* <Link to={"/"}> */}
          <button className="buttonReturn" onClick={this.clear}>Menu</button>
          <button className="buttonNewWine" onClick={this.tripleAxios}>Crap wine?</button>
          {/* <Link to={"/"}  */}
            
          {/* </Link> */}
        </section>
        <section className="wineRender fl">
          <h2>VQA Wine Spotlight</h2>
          <Wine 
            alcohol_content={this.state.oneWine.alcohol_content}
            name={this.state.oneWine.name}
            image_url={this.state.oneWine.image_url}
            origin={this.state.oneWine.origin}
            secondary_category = {this.state.oneWine.secondary_category}
            style = {this.state.oneWine.style}
            tasting_note={this.state.oneWine.tasting_note}
          />
        </section>

        <section className="recipesRender fr">
          <h2>Top <span>3 </span>Paired Dish<span>es</span></h2>
          {this.state.recipes.map((recipe, i) => {
            if(recipe.rating >= 3) {
              return(
              <div className="recipe" key={recipe.id + recipe.smallImageUrls + recipe.recipeName + recipe.sourceDisplayName}>
                <Link to={`recipe/${recipe.id}`}>
                  <div className="recipeImageContainer">
                    <img src={recipe.smallImageUrls} alt=""/>
                  </div>
                </Link>
                <Link to={`recipe/${recipe.id}`}>
                <h3>{recipe.recipeName}</h3>
                </Link>

                <p className="recipeAuthor">Recipe by: {recipe.sourceDisplayName}</p>
                <p className="dispNone">Ingredients:</p>
                <ul className="ingredientsList clear dispNone">{recipe.ingredients.map((ingredient) =>{
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