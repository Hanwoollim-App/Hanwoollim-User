import React from 'react';
import { LoginContextProvider } from './utils/context/LoginContext';
import MainNavigator from './components/navigator/MainNavigator';
import { UserInfoProvider } from './utils/context/UserInfoContext';

function App() {
	return (
		<UserInfoProvider>
			<LoginContextProvider>
				<MainNavigator />
			</LoginContextProvider>
		</UserInfoProvider>
	);
}

export default App;
