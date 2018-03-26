import React from 'react';
import './../App.css';

export default class GetListings extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
            listings: [],
            subreddits: this.props.subreddits
        };
    }
  
    // initial mount to display all the subreddits
    componentWillMount() {
        this.GetList();
    }

    // updates props when subreddit gets deleted
    componentWillReceiveProps(newProps) {
        this.setState({
            listings: [], // clears out current listings
            subreddits: newProps.subreddits // updates the new subreddit threads
        }, () => { // wait for state to update before updating list again.
            this.GetList();
        })
    }
  
    /*
        Grabs 25 listings from the list of subreddits and displays them.
    */
    GetList() {
        // reads through each subreddit name
        for (let i = 0; i < this.state.subreddits.length; i++) {
            fetch('https://www.reddit.com/r/' + this.state.subreddits[i] + '.json', { // grabs 25 threads from each subreddit
                method: 'GET'
            }).then(results => {
                return results.json();
            }).then(data => {
                // grabs data and push in local state listing a div of each thread
                let lists = data.data.children.map((list) => {
                    return (
                        <div key={list.data.id + Date.now()} className="listing">
                            <p className="subredditName">{'/r/' + list.data.subreddit}</p>
                            <a href={list.data.url} target="_blank">{list.data.title}</a>
                        </div>
                    )
                })
                // push it into local state listing
                this.setState({listings: this.state.listings.concat(lists)});
            });
        }
    }
  
    // Only show the listings
    render() {
        return (
            <div className="listing-side">
                {this.state.listings}
            </div>
        );
    }
  }