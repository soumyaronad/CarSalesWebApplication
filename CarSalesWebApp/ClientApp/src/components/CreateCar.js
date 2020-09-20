import React, { Component } from 'react';
import { Button, Form, Select, Grid, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export class CreateCar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            carData: {
                make: '',
                model: '',
                condition: '',
                carType: '',
                badge: '',
                color: '',
                bodyType: ''
            },
            bodyTypeOptions: ['Hatch', 'Sedan', 'SUV', 'Wagon', 'Coupe', 'Convertible', 'Van', 'Ute', 'Cab Chassis'],
            carCondition: ['used', 'new'],
            formErrors: {
                make: null,
                model: null,
                condition: null,
                carType: null,
                badge: null,
                color: null,
                bodyType: null
            },
            formValid: false,
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveCarData = this.saveCarData.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.redirectPage = this.redirectPage.bind(this);
        this.showToast = this.showToast.bind(this);
    }

    //Handle input change for the form input fields
    handleChange(event, dropdownData) {
        let name = dropdownData ? dropdownData.name : event.target.name;
        let value = dropdownData ? dropdownData.value : event.target.value;
        console.log(dropdownData);
        const data = Object.assign({}, this.state.carData)

        data[name] = value;

        this.setState({
            carData: data
        }, () => { this.validateField(name) });
        console.log(data);

    }

    //to redirect to home page/create vehicle page
    redirectPage() {

        this.setState({ redirect: true })

    }

    //enable display error if the field have invalid data
    errorClass(error) {
        if (error != null) {
            return (error === '' ? false : true);
        }
    };

    //to validate all text feilds of the form
    validateField(fieldName) {
        let fieldValidationErrors = this.state.formErrors;
        let formIsValid = this.state.formValid;
        let notifyType = "";
        let notifyMessage = "";



        switch (fieldName) {
            case 'make':
                fieldValidationErrors.make = this.state.carData.make != '' ? '' : 'please enter the make of the Car';
                if (!this.state.carData.make.match(/^[a-zA-Z ]*$/)) { fieldValidationErrors.make = 'Please enter Alphabets only'; }

                break;
            case 'model':
                fieldValidationErrors.model = this.state.carData.model != '' ? '' : ' please enter model of the Car';
                break;
            case 'condition':
                fieldValidationErrors.condition = this.state.carData.condition != '' ? '' : 'please select car condition';
                break;
            case 'carType':
                fieldValidationErrors.carType = this.state.carData.carType != '' ? '' : 'please select car type ex- fuel/electrical';
                break;
            case 'badge':
                fieldValidationErrors.badge = this.state.carData.badge != '' ? '' : 'please enter badge of the car';
                if (!this.state.carData.badge.match(/^[a-zA-Z ]*$/)) { fieldValidationErrors.badge = 'Please enter Alphabets only'; }
                break;
            case 'color':
                fieldValidationErrors.color = this.state.carData.color != '' ? '' : 'please enter car color ';
                break;
            case 'bodyType':
                fieldValidationErrors.bodyType = this.state.carData.bodyType !== '' ? '' : 'please select body type';
                break;
            default:
                break;
        }

        formIsValid = (fieldValidationErrors.carType === ''
            && fieldValidationErrors.make === ''
            && fieldValidationErrors.badge === ''
            && fieldValidationErrors.bodyType === ''
            && fieldValidationErrors.carType === ''
            && fieldValidationErrors.model === ''
            && fieldValidationErrors.condition === '') ? true : false;



        if (fieldValidationErrors[fieldName] !== "") {
            console.log(fieldValidationErrors.$fieldName)
            notifyType = "error";
            notifyMessage = fieldValidationErrors[fieldName];

        }

        this.setState({
            formErrors: fieldValidationErrors,
            formValid: formIsValid
        }, () => { this.showToast(notifyType, notifyMessage) });

    }
    showToast(notifyType, notifyMessage) {

        if (notifyType === "error") {
            toast.error(`${notifyMessage}`, {
                position: toast.POSITION.TOP_RIGHT

            });
        }


    }

    saveCarData() {
        var carData = this.state.carData;
        $.ajax({
            url: '/Vehicle/createNewCar',
            dataType: 'json',
            type: "post",
            contentType: 'application/json',
            data: JSON.stringify(carData),
            success: function (res) {
                console.log(res);
                if (res.success === true) {

                    toast.success("Car Data Added Successully", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(() => {
                        this.setState({ redirect: true })
                    }, 2000);


                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }.bind(this)

            , error: function (request, status, error) {
                toast.error("An Error Occured Please Try Again", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        });

        this.setState({
            carData: {
                make: '',
                model: '',
                condition: '',
                carType: '',
                badge: '',
                color: '',
                bodyType: ''
            }
        });
        this.setState({
            formErrors: {
                make: null,
                model: null,
                condition: null,
                carType: null,
                badge: null,
                color: null,
                odyType: null
            },
            formValid: false
        });
    }



    render() {



        let bodyTypeOptions = this.state.bodyTypeOptions.map((x, index) => ({ 'value': x, 'key': index, 'text': x }));
        let conditionOptions = this.state.carCondition.map((x, index) => ({ 'value': x, 'key': index, 'text': x }));
        let errors = this.state.formErrors;


        return (
            < div >
                <ToastContainer />
                {
                    !this.state.redirect ?
                        <div>
                            <Grid centered columns={2}>
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Form>
                                            <Form.Field error={this.errorClass(errors.make)} required>
                                                <label>Make</label>
                                                <input
                                                    placeholder='Brand Ex-Tesla (Alphabets only)' name='make' value={this.state.carData.make} onChange={this.handleChange} />
                                            </Form.Field>

                                            <Form.Field error={this.errorClass(errors.model)} required>
                                                <label>Model</label>
                                                <input
                                                    placeholder='Car Model Ex- Tesla Model 3' name='model' value={this.state.carData.model} onChange={this.handleChange} />
                                            </Form.Field>

                                            <Form.Field
                                                control={Select}
                                                name='condition'
                                                label='Car Condition'
                                                options={conditionOptions}
                                                onChange={this.handleChange}
                                                value={this.state.carData.condition}
                                                placeholder='Select Car Condition'
                                                error={this.errorClass(errors.bodyType)}
                                                required
                                            />

                                            <Form.Field error={this.errorClass(errors.carType)} required>
                                                <label>Car Type</label>
                                                <input placeholder='Car Type Ex- Electric Series 1' name='carType' value={this.state.carData.carType} onChange={this.handleChange} />
                                            </Form.Field>

                                            <Form.Field error={this.errorClass(errors.badge)} required>
                                                <label>Badge</label>
                                                <input placeholder='Badge Ex- Long Range (Alphabets only)' name='badge' value={this.state.carData.badge} onChange={this.handleChange} />
                                            </Form.Field>

                                            <Form.Field required>
                                                <label>Color</label>
                                                <input placeholder='Color (ex- Royal Blue)' name='color' value={this.state.carData.color} onChange={this.handleChange} />
                                            </Form.Field>
                                            <Form.Field
                                                control={Select}
                                                name='bodyType'
                                                label='Body Type'
                                                options={bodyTypeOptions}
                                                value={this.state.carData.bodyType}
                                                onChange={this.handleChange}
                                                placeholder='Select Body Type'
                                                error={this.errorClass(errors.bodyType)}
                                                required
                                            />

                                            <Button type='submit' disabled={this.state.formValid ? false : true} onClick={() => this.saveCarData()} >Save</Button>
                                            <Button onClick={() => { this.redirectPage() }} >Cancel</Button>
                                        </Form>


                                    </Segment>

                                </Grid.Column>
                            </Grid>
                        </div>

                        :
                        <Redirect to='/car-data' />
                }
            </div>
        );

    }
}

export default CreateCar;