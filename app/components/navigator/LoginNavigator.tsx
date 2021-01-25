import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ReservationNaviagator from './ReservationNaviagator';
import Initial from '../screens/Login/Initial';
import SignUp from '../screens/Login/SignUp';

const LoginStack = createStackNavigator();
function LoginNavigator() {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="Initial"
                component={Initial}
                options={{
                    headerShown: false
                }}
            />
            <LoginStack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerShown: false
                }}
            />
            <LoginStack.Screen
                name="ReservationNavigator"
                component={ReservationNaviagator}
                options={{
                    headerShown: false
                }}
            />
        </LoginStack.Navigator>
    );
}

export default LoginNavigator;