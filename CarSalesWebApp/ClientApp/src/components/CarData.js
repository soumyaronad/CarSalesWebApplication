import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import $ from 'jquery';


const styles = {
    height: '100vh'
}

export class CarData extends Component {
    static displayName = CarData.name;

    constructor(props) {
        super(props);
        this.state = {
            carData: []
        }

        this.loadCarData = this.loadCarData.bind(this);

    }

    componentDidMount() {
        this.loadCarData()
    }

    // Get Car List from the database
    loadCarData() {
        $.ajax({
            url: "/Vehicle/GetCarData",
            type: "GET",
            dataType: "json",
            context: this,
            success: function (res) {
                console.log(res);
                this.setState({ carData: res.carList, loading: false });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                toast.error("Sorry couldn't find data, please try again", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        });
    }


    render() {

        let currentData = this.state.carData;

        return (
            <div style={styles}>

                {
                    currentData.length != 0 ?

                        <Table color={"yellow"} >
                            <Table.Header >
                                <Table.Row>
                                    <Table.HeaderCell>Make</Table.HeaderCell>
                                    <Table.HeaderCell>Model</Table.HeaderCell>
                                    <Table.HeaderCell>Body Type</Table.HeaderCell>
                                    <Table.HeaderCell>Car Type</Table.HeaderCell>
                                    <Table.HeaderCell>Badge</Table.HeaderCell>
                                    <Table.HeaderCell>Color</Table.HeaderCell>
                                    <Table.HeaderCell>Condition</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>{currentData.map(carData =>
                                <Table.Row>
                                    <Table.Cell>{carData.make}</Table.Cell>
                                    <Table.Cell>{carData.model}</Table.Cell>
                                    <Table.Cell>{carData.bodyType}</Table.Cell>
                                    <Table.Cell>{carData.carType}</Table.Cell>
                                    <Table.Cell>{carData.badge}</Table.Cell>
                                    <Table.Cell>{carData.color}</Table.Cell>
                                    <Table.Cell>{carData.condition}</Table.Cell>
                                </Table.Row>
                            )}
                            </Table.Body>
                        </Table>
                        :
                        <h2>Please Create Car Data </h2>
                }
            </div>
        );// return end 
    } // render end
}//class end