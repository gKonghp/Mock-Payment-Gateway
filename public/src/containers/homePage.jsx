"use strict";
import React from 'react';
import {Link} from 'react-router-dom';
import { renderRoutes } from "react-router-config";

import { Button, Card, CardBody, CardTitle, CardText} from 'reactstrap';
export class Home extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Description</CardTitle>
                        <CardText>
                            This is a demo to show using different mock payment gateways in different conditions.
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}