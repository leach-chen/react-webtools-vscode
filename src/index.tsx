import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'element-theme-default';
import {BrowserRouter, Route} from "react-router-dom";
import MainPage from "./page/MainPage";

ReactDOM.render(
 /* <React.StrictMode>
    <App />
  </React.StrictMode>,*/
    <BrowserRouter>
        <Route exact path="/" component={MainPage} />
    </BrowserRouter>,  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
