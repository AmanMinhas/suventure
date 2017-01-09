import { Meteor } from 'meteor/meteor';
import React, {Component} from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

import { MainLayout } from '../../ui/layouts/MainLayout';
import { Homepage } from '../../ui/components/Homepage';
import { AccountsUIWrapper } from '/imports/ui/components/AccountsUIWrapper';
import { MessengerContainer } from '/imports/ui/features/messenger/messenger/MessengerContainer';
import { UserListContainer } from '/imports/ui/features/user/userList/UserListContainer'
import { UserProfileContainer } from '/imports/ui/features/user/userProfile/UserProfileContainer';

const requireAuth = (nextState,replace) => {
	if(!Meteor.loggingIn() && !Meteor.userId()) {
		replace({
			pathname: '/login',
			state: {nextPathname: nextState.location.pathname}
		});
	}
}

const renderRoutes = (
	<Router history = { browserHistory }>
		<Route path = "/" name = "" component = { MainLayout } >
			<IndexRoute name="index" component={ Homepage } onEnter = { requireAuth } />
			<Route path="/message/:userid" name="message" component={ MessengerContainer } onEnter = { requireAuth } />
			<Route path="/user/:userid" name="profile" component={UserProfileContainer} onEnter = { requireAuth } />
			<Route path="/userlist" name="userlist" component={UserListContainer} onEnter = { requireAuth } />
		</Route>
		<Route path="/login" name="login" component={ AccountsUIWrapper } />
	</Router>
);

Meteor.startup(()=>{
	render(renderRoutes, document.getElementById('app-body'))
});
