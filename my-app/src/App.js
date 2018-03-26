import React, { Component } from 'react';
import './App.css';
import Home from './components/Home.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {auth: false};
  }

  componentDidMount() {

    // I would put this in an .env file instead of here.
    const CLIENT_ID = 'sI7Qv1I2U_X9pow-4IVR9xG1bWs';
    const TYPE = 'code';
    const RANDOM_STRING = '9869119745';
    const URI = 'http://localhost:3000';
    const DURATION = 'permanent';
    const SCOPE_STRING = 'read save';


    fetch('https://www.reddit.com/api/v1/authorize?client_id=' + CLIENT_ID 
    + '&response_type='+ TYPE +'&state=' + RANDOM_STRING + '&redirect_uri='+ URI 
    + '&duration=' + DURATION + '&scope=' + SCOPE_STRING, {
      method: 'GET',
      mode: 'no-cors'
    }).then(results => {
      return results.text();
    }).then(data => {
      this.setState({auth: true});
    })
  }

  // Displays main page once user is authorized.
  // If not authorized yet, show authentication page.
  render() {
    let isAuth = this.state.auth;
    
    return (
      <div>
        { (isAuth) ? <Home /> : <p>Authenticating... Please refresh if this page does not direct you in 10 seconds.</p>}
      </div>
    );
  }
}

export default App;
