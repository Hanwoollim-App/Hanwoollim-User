import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Initial from "../screens/login/Initial";
import SignUp from "../screens/login/SignUp";

const LoginStack = createStackNavigator();

function LoginNavigator() {
	return (
		<LoginStack.Navigator>
			<LoginStack.Screen
				name="Initial"
				component={Initial}
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
