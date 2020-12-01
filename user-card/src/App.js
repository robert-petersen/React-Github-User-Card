import React from "react";
import axios from 'axios';

import './App.css';

class App extends React.Component {
  state = {
    user: "",
    userData: [],
    userFollowers: []
  }

  // componentDidMount(){
  //   axios.get(`https://api.github.com/users/${this.state.user}`)
  //       .then(res => {
  //           console.log(res)
  //           this.setState({
  //             userData: res.data
  //           })
  //       })
  //       .catch(err=> console.log(err));
  // }

  onChange = (evt) => {
    console.log(evt.target.value)
    this.setState({
      user: evt.target.value
    })
  }

  onSubmit = (evt) => {
    evt.preventDefault();

    axios.get(`https://api.github.com/users/${this.state.user}`)
        .then(res => {
            console.log(res)
            this.setState({
              userData: res.data
            })
        })
        .catch(err=> console.log(err));

    axios.get(`https://api.github.com/users/${this.state.user}/followers`)
      .then(res => {
        console.log(res)
        this.setState({
          userFollowers: res.data
        })
      })
      .catch(err=> console.log(err));

    this.setState({
      user: ""
    })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>GitHub User Card</h1>
          <form onSubmit={this.onSubmit}>
            <label>Enter A GitHub Username:
              <input
                name="user"
                type="text"
                placeholder="Enter User"
                value={this.state.user}
                onChange={this.onChange}
              />
            </label>
            <button>Find</button>
          </form>
          <div>
            <img src={this.state.userData.avatar_url} alt={this.state.userData.avatar_url}/>
            <h1>UserName: {this.state.userData.login}</h1>
            <h1>Name: {this.state.userData.name}</h1>
            <p>Bio: {this.state.userData.bio}</p>
            <p>Following: {this.state.userData.following}</p>
            <div>
              <h1>Followers: {this.state.userData.followers}</h1>
              {this.state.userFollowers.map((follower)=>{
                return(
                <h1><a href={follower.url}>{follower.login}</a></h1>
                );
              })}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
