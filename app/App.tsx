import React, {useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import LoginNavigator from "./components/navigator/LoginNavigator";
import {PROFILE_EMPTY, TOKEN_EMPTY} from "./utils/Login/InitialScreenUtils";
import LoginContext from "./context/LoginContext";


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
