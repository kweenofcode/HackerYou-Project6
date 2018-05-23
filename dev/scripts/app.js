import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './LandingPage';

class App extends React.Component {
    render() {
      return (
        <div className="wrapper">
          <LandingPage/>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));