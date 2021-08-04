import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import SignUp from '../screens/signUp';

const LoginStack = createStackNavigator();

function LoginNavigator() {
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
		</LoginStack.Navigator>
	);
}

export default LoginNavigator;
