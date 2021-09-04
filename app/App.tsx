import React from 'react';
import { LoginContextProvider } from './utils/context/login.context';
import MainNavigator from './components/navigator/root/root.navigator';
import { UserInfoProvider } from './utils/context/user-info.context';

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
