import React from 'react';
import './../App.css';
import AddSubreddit from './AddSubreddit.js';

export default class ViewSubreddit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    /*
        index: the index of the object that is to be removed.
        This function removes the object given by the index and returns the new array.
    */
    deleteSub(index) {
        let beginning = this.props.subreddits.slice(0, index);
        if (index !== this.props.subreddits.length - 1) { // not the last object
            let end = this.props.subreddits.slice(index + 1);
            return beginning.concat(end);
        } else { // last object
            return beginning;
        }
    }

    // Adds any new subreddits into the user's subreddit list.
    addSub(name) {
        let newSubredditList = this.props.subreddits;
        newSubredditList.push(name);
        this.props.callbackFromParent(newSubredditList);
    }
  
    // Displays the right sidebar.
    render() {
      return (
        <div className="subreddit-list">
            <h1>Your Subreddits</h1>
            { 
                this.props.subreddits.map((sub, i) =>{
                    return (
                        <div key={'div' + i} className='users-subreddit'>
                            <p className='subreddit'>/r/{sub}</p>
                            <button 
                                className="delete"
                                onClick={() => this.props.callbackFromParent(this.deleteSub(i))}>Delete
                            </button>
                        </div>
                    ) 
                })
            }
            <AddSubreddit addSub={(name) => this.addSub(name)}/>
        </div>
      );
    }
  }