import React, {createContext} from "react";
import {NavigationContainer } from "@react-navigation/native";
import LoginNavigator from "./components/navigator/LoginNavigator";
import { PROFILE_EMPTY, TOKEN_EMPTY } from "./utils/Login/InitialScreenUtils";

// kakao login
export const LoginContext = createContext();

function App() {
	return (
		<LoginContext.Provider value={{
			profile: PROFILE_EMPTY,
			token: TOKEN_EMPTY,
		}}>
			<NavigationContainer>
				<LoginNavigator />
			</NavigationContainer>
		</LoginContext.Provider>
	);
}


export default App;
