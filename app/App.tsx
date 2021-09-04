import React from 'react';
import { LoginContextProvider, UserInfoProvider } from './utils';
import { RootNavigator } from './components/navigator';

function App() {
	return (
		<UserInfoProvider>
			<LoginContextProvider>
				<RootNavigator />
			</LoginContextProvider>
		</UserInfoProvider>
	);
}

export default App;
