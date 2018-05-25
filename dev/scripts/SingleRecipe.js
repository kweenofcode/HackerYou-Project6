import React from 'react';
import axios from 'axios';

class SingleRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      ingredientLines: [],
      attribution: {},
      image: '',
      flavors: {},
      source: {},
    }
  }
  componentDidMount() {
    axios({
      url: `https://api.yummly.com/v1/api/recipe/${this.props.match.params.recipe_id}`,
      headers: {
        'X-Yummly-App-ID': "dfbe7dff",
        'X-Yummly-App-Key': '2bccb2cb18b4186352c9c884a2cff49a',
      },
    })
    .then((res) => {
      console.log(res);
      const fullRecipes = res.data.images[0].hostedSmallUrl;
      res.data.images[0].hostedSmallUrl = fullRecipes.split('=')[0];
      this.setState ({
        recipe: res.data,
        ingredientLines: res.data.ingredientLines,
        attribution: res.data.attribution,
        image: res.data.images[0].hostedSmallUrl,
        flavors: res.data.flavors,
        source: res.data.source,
      })
    })
  }
  render(){
    return (
      <section className="recipeRender">
        <h2><a href={this.state.attribution.url}>{this.state.recipe.name}</a></h2>
        <div class="linkContainerC">
          <a href={this.state.attribution.url}><img src={this.state.attribution.logo} alt="Recipes provided by Yummly"/></a>
        </div>
        <div className="linkContainerC">
          <a href="#"><img className="recipeImage" src={this.state.image} alt=""/></a>
        </div>
        <div className="clear">
          <div className="fl recipeIngredients">
            <h3>Ingredients</h3>
            <ul className="ingredientsList">
            {this.state.ingredientLines.map((ingredient)  => {
              return <li>+ {ingredient}</li>
            })}
            </ul>
          </div>
          <div class="fr recipeDetails">
            <h3>Details</h3>
            <p>+ Time requirement: {this.state.recipe.totalTime}  </p>
            <p>+ Recipe makes {this.state.recipe.yield}</p>
            <p className="recipeAuthor">+ See full recipe by <a href={this.state.source.sourceRecipeUrl}>{this.state.source.sourceDisplayName}</a></p>
            
          </div>
        </div>
      </section>
    )
  }
}

export default SingleRecipe;




{/*<ul>
  <li>{this.state.flavors.Bitter} Bitter</li>
  <li>{this.state.flavors.Meaty} Meaty</li>
  <li>{this.state.flavors.Piquant} Piquant</li>
  <li>{this.state.flavors.Salty} Salty</li>
  <li>{this.state.flavors.Sour} Sour</li>
  <li>{this.state.flavors.Sweet} Sweet</li>
</ul>*/}