import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import App from './App';

const actions = {
  ADD:"ADD",
  REMOVE:"REMOVE"
}
  
  let initialState = {
    messageList:[]
  }

  
  let rootReducer = (state = initialState,action) => {
  
    switch(action.type){
      case actions.ADD:
       return {...state,
         messageList:state.messageList.concat(action.payload)
        }
      case actions.REMOVE:    
       return {...state, 
        messageList: state.messageList.filter(item => item.id !== action.payload)
      }
    }
    return state;
  
  }

let store = createStore(rootReducer);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

