"use strict";
import React from 'react';
import {Link} from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import { Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

// require('vendor/vendor.scss');
export class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand tag={Link} to="/">Mock Payment Gateway</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/make-payment">Make Payment</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/check-payment">Check Payment</NavLink>
                            </NavItem>

                        </Nav>
                    </Collapse>
                </Navbar>
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}