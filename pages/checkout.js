import React, { useContext } from 'react';

import { Row, Col } from 'reactstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import InjectedCheckoutForm from '../components/checkout/CheckoutForm';
import AppContext from '../context/AppContext';

import Ordercart from '../components/ordercart/';

function Checkout() {
	// get app context
	const appContext = useContext(AppContext);
	// isAuthenticated is passed to the cart component to display order button
	const { isAuthenticated } = appContext;

	// load stripe to inject into elements components
	const stripePromise = loadStripe("pk_test_51NFKQWAgHz3QQsfF0lPCwbAGjmyVCOceyhvuxiLZCVkdecU3gI5T5AbTZjzmokqKwZEr5PBU56EO1fA8njzSdxy100JXFoauzY");
	return (
		<Row>
			<Col
				style={{ paddingRight: 10 }}
				sm={{ size: 4, order: 1, offset: 1 }}
			>
				<h1 style={{ margin: 20 }}>Checkout</h1>
				<Ordercart mr-50  isAuthenticated={isAuthenticated} />
			</Col>
			<Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
				<Elements stripe={stripePromise}>
					<InjectedCheckoutForm />
				</Elements>
			</Col>
		</Row>
	);
	// }
}
export default Checkout;
