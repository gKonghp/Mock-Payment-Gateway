"use strict";
import React from 'react';
import {LightBox} from '../components/lightBox';
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardFooter,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from 'reactstrap';
import { getPaymentAction, initializePaymentAction } from '../actions/payment';
import { connect } from 'react-redux';
import  PaymentRecord from '../components/paymentRecord';

class CheckPayment extends React.Component {
    constructor(props){
        super(props);
        this.getPayment = this.getPayment.bind(this);
        this.state = {
            referenceCode: '',
            custName: '',
            messages: null,
        }
        this.initializePayment();
    }
    getPayment(){
        if(this.state.referenceCode != '' && this.state.custName != '') {
            this.props.dispatch(getPaymentAction(this.state.referenceCode, this.state.custName));
        }else{

        }
    }

    initializePayment(){
        this.props.dispatch(initializePaymentAction());
    }

    updateValue(evt){
        var obj = {};
        obj[evt.target.name] = evt.target.value;
        this.setState(obj);
    }

    render() {
        let resultDOM;
            if(this.props.paymentRecord && this.props.paymentRecord.data && this.props.paymentRecord.status) {
                resultDOM = (<PaymentRecord record={this.props.paymentRecord.data}/>)
            }else if(this.props.paymentRecord && this.props.paymentRecord.data && !this.props.paymentRecord.status){
                this.state.messages = [{content: 'Record No Found Message'}];
                resultDOM = (<LightBox type="danger" messages={this.state.messages}/>)
            }
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Check Payment</CardTitle>
                        <CardSubtitle>Please enter Payment Reference Code and Customer Name</CardSubtitle>
                        {/*<LightBox/>*/}
                        <br/>
                        <Form>

                            <Container>
                                <Row sm="auto">
                                    <Col>

                                            <FormGroup>
                                                <Label for="paymentReferenceCode">Payment Reference Code</Label>
                                                <Input type="text" name="referenceCode" id="paymentReferenceCode" value={this.state.referenceCode} onChange={evt => this.updateValue(evt)}/>
                                            </FormGroup>
                                    </Col>
                                    <Col>
                                            <FormGroup>
                                                <Label for="customerName">Customer Name</Label>
                                                <Input type="text" name="custName" id="custName" value={this.state.custName} onChange={evt => this.updateValue(evt)}/>
                                            </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Button color="primary"  block onClick={this.getPayment}>Check</Button>
                                    </Col>
                                </Row>
                            </Container>

                        </Form>
                    </CardBody>
                </Card>
                <br/><br/>
                <Container>
                    <Row>
                        <Col>
                            {resultDOM}
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }


}

export default connect(
    state => ({
        paymentRecord: state.paymentRecord
    })
)(CheckPayment);