import React from 'react';
import './../App.css';

export default class DeleteSubreddit extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {};
    }
  
    componentDidMount() {
    }
  
    render() {
      return (
        <div className="subreddit-delete">
            <button>X</button>
        </div>
      );
    }
  }