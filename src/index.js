import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

// import AppSplash from './components/layouts/AppSplash' 

import { applyMiddleware, createStore, compose, combineReducers} from '@reduxjs/toolkit'
import { Provider } from 'react-redux';

import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

// reducers
import serviceSheetsReducer from './components/appService/data/Reducer'
import usersSlice from './components/appHome/data/usersSlice';
import customersSlice from './components/appHome/data/customersSlice';
import storagesSlice from './components/appHome/data/storagesSlice';
import partsSlice from './components/appHome/data/partsSlice';

const discard = (error, _action, _retries) => {
  console.log('DISCARD!!!',error)
  const { request, response } = error;
  console.log(request)
  if (!response) return false; // There was no response
  return 400 <= response.status && response.status < 500;
};

// https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
// const composeTools = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(
  combineReducers({
    users: usersSlice,
    parts: partsSlice,
    customers: customersSlice,
    storages: storagesSlice, 
    serviceSheets: serviceSheetsReducer
  }),
  // preloadedState, //pass in a state object like {user: "id-234"} where 'user' is a reducer & 'id-234' is its initial state
  // ...more on that at https://redux.js.org/recipes/structuring-reducers/initializing-state 

  // https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
  // composeTools(
  compose(
  //     // applyMiddleware(
  //     //     // loggerMiddleware  //etc...
  //     //     thunk
  //     // ),
      offline({...offlineConfig, discard })
  )
);


ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>

     {/* wrap this in some MSAL stuff */}
      <Provider store={store} > 
          <App />
      </Provider>
    
    </React.Fragment>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
