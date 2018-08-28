"use strict";

import {App} from '../containers/appPage';
import CheckPayment from '../containers/checkPaymentPage';
import MakePayment from '../containers/makePaymentPage';
import {Home} from '../containers/homePage';
import {NotFound} from '../containers/notFoundPage';

const routes =
    [{
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/check-payment',
                component: CheckPayment
            },
            {
                path: '/make-payment',
                component: MakePayment,

            },
            {
                path: '*',
                component: NotFound
            }
        ]
    }];

export default routes;