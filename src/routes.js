import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import Apartment from './Components/Apartment/Apartment';
import Archive from './Components/ArchiveFolder/Archive';
import CurrentCheck from './Components/CurrentCheck/CurrentCheck';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import TenantList from './Components/TenantList/TenantList';
import Nav from './Components/Nav/Nav';
// import AdminCalendar from './Components/AdminCalendar/AdminCalendar';

export default (
  <div>
    <Route path='/' component={Nav} />
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/admindashboard' component={AdminDashboard} />
      <Route path='/apartment' component={Apartment} />
      <Route path='/archive' component={Archive} />
      <Route path='/currentcheck' component={CurrentCheck} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/register' component={Register} />
      <Route path='/tenantlist' component={TenantList} />
      {/* <Route path='/admincalendar' component={AdminCalendar} /> */}
    </Switch>
  </div>
)