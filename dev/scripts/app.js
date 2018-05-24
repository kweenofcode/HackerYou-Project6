import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import Wine from './Wine';

      //origin
      //tasting_note
      //serving_suggestion
      //secondary_category (red wine/white wine) as a query
      //varietal
      //image_url/image_thumb_url
      //style
      // console.log(res.tasting_note);
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      wines: [{
        origin: '',
        tasting_note: '',
        serving_suggestion: '',
        secondary_category: '',
        varietal: '',
        image_url: '',
        image_thumb_url: '',
        style: ''
      }],


    }
  }


  componentDidMount() {
    axios({
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
    }).then(res => {
      console.log(res);
      let curatingArray = [];
      // console.log(res.data.result[0].origin)
      let data = res.data.result;

      for(let i=0;i<data.length;i++)
      {
        const curated_dataset = {
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


      

      //secondary_category (red wine/white wine) as a query
      //image_url/image_thumb_url
      

      this.setState({

        wines: curatingArray,
      })

    });
  }



    render() {
      return (
        <div>
          {this.state.wines.map((wine, index) => {
            return <Wine 
              key = {`${wine.key}${wine.origin}${wine.secondary_category}`}
              origin = {wine.origin}
              secondary_category = {wine.secondary_category}
              serving_suggestion = {wine.serving_suggestion}
              style = {wine.style}
              tasting_note = {wine.tasting_note}
              varietal = {wine.varietal}
              image_url = {wine.image_url}
              image_thumb_url = {wine.image_thumb_url}
              testkey = {wine.key}
            />
          })}
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
