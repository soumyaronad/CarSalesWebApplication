import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { CreateVehiclePage } from './components/CreateVehiclePage';
import { CreateCar } from './components/CreateCar';
import 'semantic-ui-css/semantic.min.css';
import './custom.css';
import { CarData } from './components/CarData';




export default class App extends Component {
    static displayName = App.name;

    render() {
        return (

            <Layout>
                <Route exact path='/' component={CreateVehiclePage} />
                <Route path='/create-vehicle' component={CreateVehiclePage} />
                <Route path='/create-car' component={CreateCar} />
                <Route path='/car-data' component={CarData} />
            </Layout>


        );
    }
}
