"use strict";
import React from 'react';

import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Container,
    Row,
    Col,
} from 'reactstrap';

export class NotFound extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Not Found</CardTitle>
                        <CardText>
                            The page is Not Found, please check your URL.
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}