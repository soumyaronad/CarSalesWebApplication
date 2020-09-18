import React, { Component } from 'react';
import CreateCar from './CreateCar';
import { Redirect } from 'react-router-dom';
import { Dropdown, Image, Grid, Segment } from 'semantic-ui-react';


export class CreateVehiclePage extends Component {
    static displayName = CreateVehiclePage.name;

    constructor(props) {
        super(props);
        this.state = {
            vehichleTypes: ['Car', 'Bike', 'Caravan', 'Boat'],
            createForm: false

        }

        this.onVehicleSelect = this.onVehicleSelect.bind(this);

    }

    onVehicleSelect(event, data) {

        console.log(event, data, "event,data")
           this.setState({ createForm: true });
        
    }

    render() {
        
        let vehichleOptions = this.state.vehichleTypes.map((x, index) => {

            if (x === 'Car') {
                return { 'value': x, 'key': index, 'text': x }
            }
            else {
                return { 'value': x, 'key': index, 'text': x, 'disabled': true }
            }
        });
        return (
            <div>
                {!this.state.createForm ?
                    <div>
                   
                        <Grid centered columns={2}>
                            <Grid.Column width={8}>
                                <Segment textAlign="center">
                                    <Dropdown
                                        centered
                                        button
                                        className='icon'
                                        floating
                                        labeled
                                        icon='car'
                                        options={vehichleOptions}
                                        search
                                        text='Select Vehicle Type'
                                        onChange={this.onVehicleSelect}
                                    />
                                    
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        

                        </div>
                    : <Redirect to='/create-car' />

                }





            </div>
        );
    }
}
