import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Dropdown, Image, Grid, Segment} from 'semantic-ui-react';
import $ from 'jquery';
import src from '../Images/Guide.png';



const styel = {
    height: '100vh'
}

export class CreateVehiclePage extends Component {
    static displayName = CreateVehiclePage.name;

    constructor(props) {
        super(props);
        this.state = {
            vehichleTypes: ['Car', 'Bike', 'Caravan', 'Boat'],
            createForm: false,

        }

        this.onVehicleSelect = this.onVehicleSelect.bind(this);


    }


    //change vehile type based on the dropdown selection

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
            <div style={styel}>
                <div>
                    {!this.state.createForm ?
                        <div >
                            <Grid centered columns={2} >
                                <Grid.Column width={4} >

                                    <Segment textAlign="center" color={"red"} inverted>

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


                    <Grid centered columns={2} >
                        <Grid.Column width={8} >
                            <Segment>
                                <div>
                                    <Image src={src} />
                                </div>
                            </Segment>
                        </Grid.Column>
                    </Grid>

                </div>
            </div>
        );
    }
}
