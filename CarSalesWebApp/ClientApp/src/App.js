import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { CreateVehiclePage } from './components/CreateVehiclePage';
import { CreateCar } from './components/CreateCar';
import 'semantic-ui-css/semantic.min.css';
import {  Container } from 'semantic-ui-react';
import './custom.css'; 





export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          
        <Layout>
            <Route exact path='/' component={CreateVehiclePage} />
            <Route path='/create-vehicle' component={CreateVehiclePage} />
            <Route path='/create-car' component={CreateCar} />
        <Route path='/fetch-data' component={FetchData} />
              </Layout>
          
    );
  }
}
