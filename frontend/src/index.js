
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import './assets/base.css';
import './Menu/menu.css'
import configureStore from './config/configureStore';
import Main from './DemoPages/Main';
import ChangePassword from './LoginComponents/ChangePassword';
import Login from './LoginComponents/Login';
import Register from './LoginComponents/Register';
import UpdateProfile from './LoginComponents/UpdateProfile';

const rootElement = document.getElementById('root');


const store = configureStore();
const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter history={createBrowserHistory()}>
        <Route path={'/Login'} exact component={Login} />
        <Route path={'/Register'} component={Register} />
        <Route path={'/ChangePassword'} component={ChangePassword} />
        <Route path={'/UpdateProfile'} component={UpdateProfile} />
        <Component />
      </HashRouter>
    </Provider>
    , rootElement
  );
};

renderApp(Main);
