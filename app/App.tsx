import React from 'react';
import { UserInfoProvider } from './utils';
import { RootNavigator } from './components/navigator';
import { LoadingModalProvider } from './utils/context/loading-modal.context';

function App() {
	return (
		<UserInfoProvider>
			<LoadingModalProvider>
				<RootNavigator />
			</LoadingModalProvider>
		</UserInfoProvider>
	);
}

export default App;
