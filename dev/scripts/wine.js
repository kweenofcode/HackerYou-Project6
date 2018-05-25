import React from 'react';

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