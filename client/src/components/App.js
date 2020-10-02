import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import NotFound from './NotFound';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
const App = ()=> (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/Signup' component={Signup} />
          <Route exact path='/Signin' component={Signin} />
          <AdminRoute 
            exact
            path='/admin/dashboard'
            component={AdminDashboard} 
          />
          <UserRoute 
            exact 
            path='/user/dashboard' 
            component={UserDashboard} 
          />
          <Route component={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
);


export default App;
