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
      <div>
        <h1>{this.state.recipe.name}</h1>
        <img src={this.state.image} alt=""/>
        <p>Rating: {this.state.recipe.rating}</p>
        <p>Cook Time: {this.state.recipe.cookTime}</p>
        <ul>
          {this.state.ingredientLines.map((ingredient) => {
            return <li>{ingredient}</li>
          })}
        </ul>
        <ul>
          <li>{this.state.flavors.Bitter} Bitter</li>
          <li>{this.state.flavors.Meaty} Meaty</li>
          <li>{this.state.flavors.Piquant} Piquant</li>
          <li>{this.state.flavors.Salty} Salty</li>
          <li>{this.state.flavors.Sour} Sour</li>
          <li>{this.state.flavors.Sweet} Sweet</li>
        </ul>
        <ul>
          <li>{this.state.source.sourceDisplayName } </li>
          <li><a href={this.state.source.sourceRecipeUrl}> Source </a> </li>
        </ul>
        <p>Total Time: {this.state.recipe.totalTime}</p>
        <p>{this.state.recipe.yield}</p>
        <div>
          <p>{this.state.attribution.text}</p>
          <img src={this.state.attribution.logo} alt=""/>
          <a href={this.state.attribution.url}>Link</a>
          <img src={this.state.attribution.image} alt=""/>
        </div>
      </div>
    )
    }
  }

export default SingleRecipe;