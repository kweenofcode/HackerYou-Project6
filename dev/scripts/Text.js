import React from 'react';
import axios from 'axios';

class Text extends React.Component{
  constructor(){
    super();

  }
  componentDidMount(){
    axios({
      url: 'https://api.dandelion.eu/datatxt/nex/v1',
      data: {
        token: 'bc77fbf397184fc1b069f3085e709f0d',
        text: 'Pairs perfectly with red berries and red meat',
      },
      dataType: 'jsonp',
    })
    .then((res) => {
      console.log(res);
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