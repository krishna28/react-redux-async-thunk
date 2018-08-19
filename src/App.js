import React, { Component } from 'react';
import { connect } from 'react-redux';


import './App.css';

const actions = {
  ADD:"ADD",
  REMOVE:"REMOVE"
}


let addMessage = (username,message,dispatch) => {

    dispatch({
      type:actions.ADD,
      payload: {
        message:message,
        username:username,
        id:Date.now()
      }
     })
}


let removeMessage = (id,dispatch) => {
  dispatch({
    type:actions.REMOVE,
    payload:id
  })
}


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      username:"",
      message:""
    }
  }

  onUsernameChange = (event) => {
   event.preventDefault();
   let username = event.target.value;
   this.setState(() => {
     return {
       username: username
     }
   })
  } 

  onMessageChange = (event) => {
    event.preventDefault();
    let message = event.target.value;
    this.setState(() => {
      return {
        message: message
      }
    })
  }

  
  onSubmit = (event) => {
    event.preventDefault();
    let message = this.state.message;
    let username = this.state.username;
    this.props.add(message,username);

  }

  render() {
    return (
      <div className="wrapper">
        <form name="post" onSubmit={this.onSubmit}>
        <input style={{padding:'10px',margin:'10px',width:'70%',textAlign:'left'}}
         type="text" 
         placeholder="username" 
         name="username" value={this.state.username}
         onChange={this.onUsernameChange} /><br />

        <textarea style={{padding:'10px',margin:'10px',width:'70%',rows:'50',cols:'40',textAlign:'left'}} 
        placeholder="message"
        name="message" 
        value={this.state.message}
        onChange={this.onMessageChange}>
         </textarea><br />

         <input style={{padding:'10px',margin:'10px',backgroundColor:'orange',textAlign:'left'}}
          type="submit"
           value="Post" />
        </form>
        <div>
          {this.props.messages.map((message) => {
            return <div style={{display:'inline-block',
            padding:'20px',cursor:'pointer', margin:'0 20px 20px 0',
             border:'1px solid black', width:'200px'}} key={message.id}
              onClick={() => this.props.remove(message.id)}>
              <p>Username: {message.username}</p>
              <p>Message: {message.message}</p>
            </div>
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messageList
  }
}

const mapDispatchToProps = dispatch => {
return {
 add : (username,message) => addMessage(username,message,dispatch),
 remove: (id) => removeMessage(id,dispatch) 
}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
