import React, {useState, createContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import LoginNavigator from "./components/navigator/LoginNavigator";
import {PROFILE_EMPTY, TOKEN_EMPTY} from "./utils/Login/InitialScreenUtils";

// kakao login
export const LoginContext = createContext();

function App() {
	const [token, setToken] = useState(TOKEN_EMPTY);
	const [profile, setProfile] = useState(PROFILE_EMPTY);

	return (
		<LoginContext.Provider value={{
			token: [token, setToken],
			profile: [profile, setProfile],
		}}>
			<NavigationContainer>
				<LoginNavigator />
			</NavigationContainer>
		</LoginContext.Provider>
	);
}


export default App;
