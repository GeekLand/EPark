import React from 'react';
import ReactDOM from 'react-dom';

import App from './script/App';
import Login from './script/Login';
import Register from './script/Register';
import TemplateDemo from './script/TemplateDemo';



import './style/common.css';
import './index.css';
import "./style/App.css";

import { Router, Route, hashHistory, IndexRoute, IndexRedirect} from 'react-router';

ReactDOM.render(
    (<Router history={hashHistory}>
      <Route path="/">
          <IndexRedirect to="/Login" />
          <Route path="Login" component={Login}/>
          <Route path="Register" component={Register}/>
          <Route path="App" component={App}>
              <IndexRoute component={TemplateDemo} />
              {/*<Route path="OrderInfo" component={OrderInfo}/>*/}
              
          </Route>
      </Route>
  </Router>),
  document.getElementById('root')
);