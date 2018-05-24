import React from 'react';
import axios from 'axios';
import Qs from 'qs';

class Text extends React.Component{
  constructor(){
    super();

  }
  componentDidMount(){
    axios({
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
          text: 'Ideal for serving alongside grilled red meats, pot roast, lamb kebobs, grilled Portobello mushrooms or aged cheddar',
        },
        xmlToJSON: false
      }

      //Promise to return package unit type (can/bottle), total pacakge units (6/package), image_url, price, and producer name
    }).then(res => {
    const allIngredients = [];
    allIngredients.push(res.data.annotations[0].spot)
    const ingredients = allIngredients.join(', ');
    this.setState({
      text: ingredients,
    })
  })
  }
  render(){
    return(
      <div>
        <h1>Text Analysis Testing</h1>
      </div>
    )
  }
}

export default Text;