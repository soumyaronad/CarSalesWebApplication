import React, { Component } from 'react';
import { Button, Form, Select, Grid, Segment} from 'semantic-ui-react';
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


    redirectPage() {

        this.setState({ redirect: true })

    }
    errorClass(error) {
        if (error != null) {
            return (error === '' ? false : true);
        }
    };

    validateField(fieldName) {
        let fieldValidationErrors = this.state.formErrors;
        let formIsValid = this.state.formValid;
        let notifyType = "";
        let notifyMessage = "";



        switch (fieldName) {
            case 'make':
                fieldValidationErrors.make = this.state.carData.make != ''? '' : 'please enter the make of the Car';
               // if (fieldValidationErrors.make !== '') { notifyType = "error"; notifyMessage = fieldValidationErrors }
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
                fieldValidationErrors.badge = this.state.carData.badge != ''? '' : 'please enter badge of the car';
                break;
            case 'color':
                fieldValidationErrors.color = this.state.carData.color != '' ? '' : 'please enter car color ';
                break;
            case 'bodyType':
                fieldValidationErrors.bodyType = this.state.carData.bodyType !==''? '' : 'please select body type';
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

           

        if (fieldValidationErrors[ fieldName ] !== "") {
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
            url: '/Car/createNewCar',
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
      
                } else {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }

             , error: function (request, status, error) {
                 toast.success("An Error Occured Please Try Again", {
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
            }
        });
    }



    render() {

       

        let bodyTypeOptions = this.state.bodyTypeOptions.map((x, index) => ({ 'value': x, 'key': index, 'text': x }));
        let conditionOptions = this.state.carCondition.map((x, index) => ({ 'value': x, 'key': index, 'text': x }));
        let formValid = this.state.formValid;
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
                                            <Form.Field error={this.errorClass(errors.make)}>
                                                <label>Make</label>
                                                <input
                                                    placeholder='Brand' name='make' value={this.state.carData.make} onChange={this.handleChange} />
                                            </Form.Field>
                                          
                                            <Form.Field error={this.errorClass(errors.model)}>
                                                <label>Model</label>
                                                <input 
                                                    placeholder='Car Model' name='model' value={this.state.carData.model} onChange={this.handleChange} />
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
                                            />
                                            
                                            <Form.Field error={this.errorClass(errors.carType)}>
                                                <label>Car Type</label>
                                                <input placeholder='Type' name='carType' value={this.state.carData.carType} onChange={this.handleChange} />
                                            </Form.Field>
                                            
                                            <Form.Field error={this.errorClass(errors.badge)}>
                                                <label>Badge</label>
                                                <input placeholder='Badge' name='badge' value={this.state.carData.badge} onChange={this.handleChange} />
                                            </Form.Field>
                                           
                                            <Form.Field>
                                                <label>Color</label>
                                                <input placeholder='Color' name='color' value={this.state.carData.color} onChange={this.handleChange} />
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
                                            />

                                            <Button type='submit' disabled={this.state.formValid? false:true} onClick={() => this.saveCarData()} >Save</Button>
                                            <Button onClick={() => { this.redirectPage() }} >Cancel</Button>
                                        </Form>


                                    </Segment>

                                </Grid.Column>
                            </Grid>
                        </div>

                        :
                        <Redirect to='/create-vehicle' />
                }
            </div>
        );

    }
}

export default CreateCar;