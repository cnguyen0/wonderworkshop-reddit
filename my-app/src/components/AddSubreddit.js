import React from 'react';
import './../App.css';

export default class AddSubreddit extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          currSearch: []
      };

      this.handleChange = this.handleChange.bind(this)
    }

    // Queries all subreddits that starts with what the user's input.
    handleChange(e) {
        let query = e.target.value;
        fetch('https://www.reddit.com/api/subreddit_autocomplete_v2.json?query=' + query + '&limit=5', { // grabs 25 threads from each subreddit
            method: 'GET'
        }).then(results => {
            return results.json();
        }).then(data => {
            if (this.state.currSearch) {
                this.setState({currSearch: data.data.children});
            }
        });
    }

    // Pass in the url and splits it to grab the name of the subreddit only.
    // Returns the string name of the subreddit.
    updateSubs(url) {
        let getName = url.split('/');
        return getName[2];
    }

    /*
        Two parts: 
            1. Has the search input that dynamically displays the searched subreddits.
            2. Adds any subreddit to the user's current list.
    */
    render() {
      return (
        <div className="search">
            <h1>Add subreddits</h1>
            <input type="text" placeholder='Search subreddits here' onChange={this.handleChange}/>
            {
                this.state.currSearch.map((query) => {
                    return (
                        <div key={Date.now() + query.data.id} className='users-subreddit'>
                            <p className='subreddit'>{query.data.url}</p>
                            <button 
                                className="add"
                                onClick={() => this.props.addSub(this.updateSubs(query.data.url))}>Add
                            </button>
                        </div>
                    )
                })
            }
        </div>
      );
    }
  }