import React from 'react';
import { UserInfoProvider } from './utils';
import { RootNavigator } from './components/navigator';

function App() {
	return (
		<UserInfoProvider>
			<RootNavigator />
		</UserInfoProvider>
	);
}

export default App;
