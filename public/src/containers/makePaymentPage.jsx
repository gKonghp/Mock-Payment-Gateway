"use strict";
import React from 'react';
import {Link} from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import { Button, Card, CardBody,CardFooter, CardTitle, Container, Row, Col, CardSubtitle, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {LightBox} from '../components/lightBox';
import { createPaymentAction, initializePaymentAction } from '../actions/payment';
import { connect } from 'react-redux';
import * as cardValidator from 'card-validator';

class MakePayment extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            messages: null,
            custName: '',
            custPhone: '',
            currency: '',
            price: '',
            cardHolderName: '',
            cardNum: '',
            cardExpiration: '',
            cardCCV: '',
            formErrors: {custName: '', custPhone: '', currency: '', price: '', cardHolderName: '', cardNum: '', cardExpiration: '', cardCCV: ''},
            custNameValid: true,
            custPhoneValid: true,
            currencyValid: true,
            priceValid: true,
            cardHolderNameValid: true,
            cardNumValid: true,
            cardExpirationValid: true,
            cardCCVValid: true,
            formValid: true,
            status: false,
            card: null,
        };
        this.initializePayment();
    }

    updateValue(evt){
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({[name]:value}, () => { this.validateField(name, value)});
    }

    initializePayment(){
        this.props.dispatch(initializePaymentAction());
    }

    clearField(fieldName){
        this.setState({[fieldName]:''});
    }

    resetForm(){
        this.clearField('custName');
        this.clearField('custPhone');
        this.clearField('currency');
        this.clearField('price');
        this.clearField('cardHolderName');
        this.clearField('cardNum');
        this.clearField('cardExpiration');
        this.clearField('cardCCV');
    }

    checkField(fieldname){
        this.validateField(fieldname, this.state[fieldname]);
    }

    componentWillReceiveProps(nextProps, nextState){

        console.log(this.props.payment);
        if(nextProps.payment && !nextProps.payment.status && nextProps.payment.data ){
            console.log(nextProps.payment);
            this.setState({messages:[{content: `Fail to order. Please contact the Support. info: ${nextProps.payment.data}`}]});
        }else if(nextProps.payment && nextProps.payment.data && nextProps.payment.status) {
            this.setState({status:true});
            console.log(nextProps.payment);
            this.setState({messages:[{content: `Successful!  Reference code: ${nextProps.payment.data.referenceCode} Customer Name: ${nextProps.payment.data.custName}`}]});
        }

    }
    submit(){
        console.log("submit function");

        this.checkField('custName');
        this.checkField('custPhone');
        this.checkField('currency');
        this.checkField('price');
        this.checkField('cardHolderName');
        this.checkField('cardNum');
        this.checkField('cardExpiration');
        this.checkField('cardCCV');
        this.validateForm();
        if(this.state.formValid){
            //sumbit
            let data = {
                custName : this.state.custName,
                custPhone: this.state.custPhone,
                currency: this.state.currency,
                price: this.state.price,
                cardHolderName: this.state.cardHolderName,
                cardNum: this.state.cardNum,
                cardExpiration: this.state.cardExpiration,
                cardCCV: this.state.cardCCV
            }
            this.props.dispatch(createPaymentAction(data));

        }
        return false;
    }

    mapErrors() {
        if(!this.state.formValid){
            this.state.messages = null;
            Object.keys(this.state.formErrors).map((fieldName, i) => {
                if (this.state.formErrors[fieldName].length > 0) {
                    this.state.status = false;
                    if(this.state.messages == null){
                        this.state.messages = [];
                    }
                    this.state.messages.push({content: `${this.state.formErrors[fieldName]}`});
                }
            });
        }
    }

    getStatus(){
        if(this.state.status){
            return 'success';
        }else{
            return 'danger'
        }
    }

    render() {
        this.mapErrors();
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Make Payment</CardTitle>
                        <LightBox type={this.getStatus()} messages={this.state.messages}/>
                        <hr/>
                        <Form>
                        <Container >
                            <Row>
                            <Col sm="6">
                                <h5>Order Section</h5>

                                    <FormGroup>
                                        <Label for="custName">Customer Name</Label>
                                        <Input type="text" name="custName" id="custName" invalid={!this.state.custNameValid} value={this.state.custName} onChange={evt => this.updateValue(evt)}/>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="custPhone">Phone Nubmer</Label>
                                        <Input type="text" name="custPhone" id="custPhone" invalid={!this.state.custPhoneValid} value={this.state.custPhone} onChange={evt => this.updateValue(evt)}/>
                                    </FormGroup>
                                <FormGroup>
                                    <Label for="currency">Currency</Label>
                                    <Input type="select"  invalid={!this.state.currencyValid} name="currency" id="currency" value={this.state.currency} onChange={evt => this.updateValue(evt)}>
                                        <option value="">Select</option>
                                        <option value="HKD">HKD</option>
                                        <option value="USD">USD</option>
                                        <option vlaue="AUD">AUD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="JPY">JPY</option>
                                        <option value="CNY">CNY</option>
                                    </Input>
                                </FormGroup>
                                    <FormGroup>
                                        <Label for="price">Price</Label>
                                        <Input type="text" name="price" id="price" invalid={!this.state.priceValid} value={this.state.price} onChange={evt => this.updateValue(evt)}/>
                                    </FormGroup>

                            </Col>
                            <Col sm="6">
                                <h5>Payment Section</h5>
                                    <FormGroup>
                                        <Label for="cardHolderName">Credit Card Holder Name </Label>
                                        <Input type="text" name="cardHolderName" id="cardHolderName" invalid={!this.state.cardHolderNameValid} value={this.state.cardHolderName} onChange={evt => this.updateValue(evt)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="cardNum">Credit Card Number <span>{this.state.card? `(${this.state.card.niceType})`:''}</span></Label>
                                        <Input type="text" name="cardNum" id="cardNum" invalid={!this.state.cardNumValid} value={this.state.cardNum} onChange={evt => this.updateValue(evt)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="cardExpiration">Credit Card Expiration</Label>
                                        <Input type="text" name="cardExpiration" id="cardExpiration" placeholder="MM/YY" invalid={!this.state.cardExpirationValid} value={this.state.cardExpiration} onChange={evt => this.updateValue(evt)}/>

                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="cardCCV">Credit Card CCV</Label>
                                        <Input type="text" name="cardCCV" id="cardCCV" invalid={!this.state.cardCCVValid} value={this.state.cardCCV} onChange={evt => this.updateValue(evt)}/>
                                    </FormGroup>

                            </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button type="button" block color="primary" disabled={!this.state.formValid} onClick={this.submit}>Submit</Button>
                                </Col>
                            </Row>
                        </Container>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let custNameValid = this.state.custNameValid;
        let custPhoneValid = this.state.custPhoneValid;
        let currencyValid = this.state.currencyValid;
        let priceValid = this.state.priceValid;
        let cardHolderNameValid = this.state.cardHolderNameValid;
        let cardNumValid = this.state.cardNumValid;
        let cardExpirationValid = this.state.cardExpirationValid;
        let cardCCVValid = this.state.cardCCVValid;

        switch(fieldName) {
            case 'custName':
                custNameValid = value.match(/^([\u4e00-\u9fa5a-zA-Z\s]+)$/i);
                fieldValidationErrors.custName = custNameValid ? '' : 'Customer Name is invalid. Only accept English or Chinese name';
                break;
            case 'custPhone':
                custPhoneValid = value.match(/^([23456789][\d]{7})$/i);
                fieldValidationErrors.custPhone = custPhoneValid ? '': ' Phone is invalid. Please enter an valid 8-digits HK Phone number.';
                break;
            case 'currency':
                currencyValid = value.match(/^(HKD|USD|AUD|EUR|JPY|CNY)$/i);
                fieldValidationErrors.currency = currencyValid ? '' : ' Currency is invalid';
                break;
            case 'price':
                priceValid = value.match(/^([\d]{1,}(\.[\d]{1,2})?)$/i);
                fieldValidationErrors.price = priceValid ? '' : 'Price is invalid';
                break;
            case 'cardHolderName':
                cardHolderNameValid = value.match(/^([\u4e00-\u9fa5a-zA-Z\s]+)$/i);
                fieldValidationErrors.cardHolderName = cardHolderNameValid ? '' : 'Card Holder Name is invalid. Only accept English or Chinese name';
                break;
            case 'cardNum':
                var cardNumberValid = cardValidator.number(value);
                this.setState({card:cardNumberValid.card});

                //cardNumValid = value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/i);
                cardNumValid = !(cardNumberValid == null  || !cardNumberValid.isValid);
                fieldValidationErrors.cardNum = cardNumValid ? '' : (cardNumberValid.card? cardNumberValid.card.niceType + ' ':'') + 'Card Number is invalid or not supported.';
                break;
            case 'cardExpiration':

                cardExpirationValid = cardValidator.expirationDate(value, 90).isValid;

                fieldValidationErrors.cardExpiration = cardExpirationValid ? '' : 'Card Expiration is invalid';

                break;
            case 'cardCCV':
                if(this.state.card) {
                    cardCCVValid = value.length == this.state.card.code.size;
                    fieldValidationErrors.cardCCV = cardCCVValid ? '' : `Card CCV is invalid. Length: ${this.state.card.code.size}`;
                }else{
                    cardCCVValid = value.match(/^([\d]{3,4})$/i);
                    fieldValidationErrors.cardCCV = cardCCVValid ? '' : 'Card CCV is invalid';
                }

                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            custNameValid: custNameValid,
            custPhoneValid: custPhoneValid,
            currencyValid: currencyValid,
            priceValid: priceValid,
            cardHolderNameValid: cardHolderNameValid,
            cardNumValid: cardNumValid,
            cardExpirationValid: cardExpirationValid,
            cardCCVValid: cardCCVValid
        }, this.validateForm);

    }

    validateForm() {
        this.setState({
            formValid:  this.state.custNameValid &&
            this.state.custPhoneValid &&
            this.state.currencyValid &&
            this.state.priceValid &&
            this.state.cardHolderNameValid &&
            this.state.cardNumValid &&
            this.state.cardExpirationValid &&
            this.state.cardCCVValid
        });
    }

}

export default connect(
    state => ({
        payment: state.payment
    })
)(MakePayment);