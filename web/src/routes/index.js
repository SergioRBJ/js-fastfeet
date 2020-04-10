import React from 'react';
import { Switch } from 'react-router-dom';

import Delivery from '~/pages/Delivery';
import DeliveryForm from '~/pages/Delivery/Form';
import Problems from '~/pages/Problems';
import Recipients from '~/pages/Recipients';
import RecipientsForm from '~/pages/Recipients/Form';
import Sender from '~/pages/Sender';
import SenderForm from '~/pages/Sender/Form';
import SingIn from '~/pages/SingIn';

import Route from './Route';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SingIn} />

			<Route path="/deliveries" exact component={Delivery} isPrivate />
			<Route path="/deliveries/form" exact component={DeliveryForm} isPrivate />
			<Route
				path="/deliveries/form/:id"
				exact
				component={DeliveryForm}
				isPrivate
			/>

			<Route path="/sender" exact component={Sender} isPrivate />
			<Route path="/sender/form" exact component={SenderForm} isPrivate />
			<Route path="/sender/form/:id" exact component={SenderForm} isPrivate />

			<Route path="/recipients" exact component={Recipients} isPrivate />
			<Route
				path="/recipients/form"
				exact
				component={RecipientsForm}
				isPrivate
			/>
			<Route
				path="/recipients/form/:id"
				exact
				component={RecipientsForm}
				isPrivate
			/>

			<Route path="/problems" component={Problems} isPrivate />
		</Switch>
	);
}
