import React, { useState } from 'react';
import { PROFILE_EMPTY, TOKEN_EMPTY } from './utils/constant/login/login';
import LoginContext from './utils/context/LoginContext';
import MainNavigator from './components/navigator/MainNavigator';
import { UserInfoProvider } from './utils/context/UserInfoContext';

function App() {
	const [token, setToken] = useState(TOKEN_EMPTY);
	const [profile, setProfile] = useState(PROFILE_EMPTY);

	return (
		<UserInfoProvider>
			<LoginContext.Provider
				value={{
					token: [token, setToken],
					profile: [profile, setProfile],
				}}>
				<MainNavigator />
			</LoginContext.Provider>
		</UserInfoProvider>
	);
}

export default App;
