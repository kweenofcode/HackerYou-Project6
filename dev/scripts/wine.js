import React from 'react';

// class Wine extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             wines: [{
//                 alcohol_content: 0,
//                 origin: '',
//                 name: '',
//                 tasting_note: '',
//                 serving_suggestion: '',
//                 secondary_category: '',
//                 varietal: '',
//                 image_url: '',
//                 image_thumb_url: '',
//                 style: ''
//             }],
//             oneWine: ''
//         }
//     }

//     getRandomize(winesArray) {
//         return winesArray[Math.floor((Math.random() * (winesArray.length - 1) + 1))]
//     }



//     async componentDidMount(){
        
//     }


// }





//complex
const Wine = (props) => {
    return (
        <div>
            <img className="wineImage" src={props.image_url}></img>
            <h3>{props.name}</h3>
            <p className="wineOrigin">{props.origin}</p>
            <p className="wineDesc">{props.tasting_note}</p>
            <p className="wineTags">{props.secondary_category} | Alcohol Content: {props.alcohol_content}| {props.style}</p>
        </div>
    )

}

export default Wine;