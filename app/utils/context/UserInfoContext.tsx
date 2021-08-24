/* eslint-disable no-undef */
import React from 'react';

export const UserInfoContext = React.createContext({});
export const UserInfoProvider = ({ children }: any) => {
	const [user, setUser] = React.useState<string>();

	return (
		<UserInfoContext.Provider value={{ user, setUser }}>
			{children}
		</UserInfoContext.Provider>
	);
};
