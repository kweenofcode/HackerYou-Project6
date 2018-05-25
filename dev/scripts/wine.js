import React from 'react';

const Wine = (props) => {
    return (
        <div>
            <img className="wineImage" src={this.state.oneWine.image_url}></img>
            <h3>{props.name}</h3>
            <p className="wineOrigin">{this.state.oneWine.origin}</p>
            <p className="wineDesc">{this.state.oneWine.tasting_note}</p>
            <p className="wineTags">{this.state.oneWine.secondary_category} | Alcohol Content: {this.state.oneWine.alcohol_content}| {this.state.oneWine.style}</p>
        </div>
    )

}

export default Wine;