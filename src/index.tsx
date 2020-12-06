import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'element-theme-default';
import BasicRouter from './page/root/AppRoute';

ReactDOM.render(
 /* <React.StrictMode>
    <App />
  </React.StrictMode>,*/
/*   <HashRouter>
        <Switch>
            <Route exact path="/" component={MainPage}/>
        </Switch>
   </HashRouter>,*/
   <BasicRouter />,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
