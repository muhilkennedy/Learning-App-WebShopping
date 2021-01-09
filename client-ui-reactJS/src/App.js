import React from 'react';
import './App.css';
import AppRouter from './Components/AppRouter';
import NoMatch from './Components/Nomatch/Nomatch';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

/** Redux Provider */
import { Provider } from 'react-redux';

/** Store */
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/' component={AppRouter} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
