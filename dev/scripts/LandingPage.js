import React from 'react';

const LandingPage = () => {
        return (
          <main className="landingPage">
              <div className="landingContent">
                <h1>Wine ON, Dine ON</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At magni voluptates ipsa nihil quae consectetur nobis, sequi vel fuga doloremque quidem quibusdam nisi praesentium dicta labore iste iusto placeat dolores neque cum? Sapiente eveniet sequi vel fuga doloremque rem vitae? Excepturi, id exercitationem nisi, soluta minima quisquam ducimus quae error, nulla beatae esse laboriosam!</p>
                <form action="">
                <div>
                    <input type="checkbox" id=""/><label for="">Lactose</label>
                    <input type="checkbox" id=""/><label for="">Vegan</label>
                    <input type="checkbox" id=""/><label for="">Vegetarian</label>
                    <input type="checkbox" id="TEST"/><label for="TEST">Gluten-Free</label>
                </div>
                <input type="submit" value="Explore"/>
                </form>
              </div>
          </main>
        )
}

export default LandingPage