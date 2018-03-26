import React from 'react';
import './../App.css';
import GetListing from './getListings.js';
import ViewSubreddit from './ViewSubreddit.js';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
          subreddits: ['news'] // Default is /r/news
        };
    }
  
    // Displays the whole reddit page.
    render() {
      return (
        <div className="home">
            <h1>Welcome to the (new and improved) Reddit!</h1>
            <GetListing subreddits={this.state.subreddits}/>
            <ViewSubreddit subreddits={this.state.subreddits} 
                callbackFromParent={(update) => {this.setState({subreddits: update});}}/>
        </div>
      );
    }
  }