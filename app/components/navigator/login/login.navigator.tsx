import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/login';
import SignUp from '../../screens/sign-up';
import NotApproved from '../../screens/not-approved';
import SignIn from '../../screens/sign-in';

const LoginStack = createStackNavigator();

export function LoginNavigator() {
	return (
		<LoginStack.Navigator>
			<LoginStack.Screen
				name="Login"
				component={Login}
				options={{
					headerShown: false,
				}}
			/>
			<LoginStack.Screen
				name="SignUp"
				component={SignUp}
				options={{
					headerShown: false,
				}}
			/>
			<LoginStack.Screen
				name="NotApproved"
				component={NotApproved}
				options={{
					headerShown: false,
				}}
			/>
			<LoginStack.Screen
				name="SignIn"
				component={SignIn}
				options={{
					headerShown: false,
				}}
			/>
		</LoginStack.Navigator>
	);
}
