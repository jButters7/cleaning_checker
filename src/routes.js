import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminDashboard from './Components/AdminDashboard';
import Apartment from './Components/Apartment';
import Archive from './Components/Archive';
import CurrentCheck from './Components/CurrentCheck';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import TenantList from './Components/TenantList';

export default (
  <Switch>
    <Route exact path='/admindashboard' component={AdminDashboard} />
    <Route exact path='/apartment' component={Apartment} />
    <Route exact path='/archive' component={Archive} />
    <Route exact path='/currentcheck' component={CurrentCheck} />
    <Route exact path='/dashboard' component={Dashboard} />
    <Route exact path='/' component={Login} />
    <Route exact path='/register' component={Register} />
    <Route exact path='/tenantlist' component={TenantList} />
  </Switch>
)