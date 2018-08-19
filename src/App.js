import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      username:"",
      message:"",
      messageList: []
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


  remove = (id) => {
    const updatedList = this.state.messageList.filter((message) => message.id !== id);
    this.setState(() => {
      return {
        messageList: updatedList
      }
    })
  }

  
  onSubmit = (event) => {
    event.preventDefault();
    let message = this.state.message;
    let username = this.state.username;
    this.setState((prevState) =>{
      return {
        messageList: prevState.messageList.concat({message:message,username:username,id:Date.now()})
      }
    })
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
          {this.state.messageList.map((message) => {
            return <div style={{display:'inline-block',
            padding:'20px',cursor:'pointer', margin:'0 20px 20px 0',
             border:'1px solid black', width:'200px'}} key={message.id}
              onClick={() => this.remove(message.id)}>
              <p>Username: {message.username}</p>
              <p>Message: {message.message}</p>
            </div>
          })}
        </div>
      </div>
    );
  }
}

export default App;
