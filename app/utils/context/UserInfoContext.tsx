/* eslint-disable no-undef */
import React, { useState, createContext } from 'react';

export interface userInterface {
	userName: string;
	major: string;
	studentId: number;
}

export const UserInfoContext = createContext({});
export const UserInfoProvider = ({ children }: any) => {
	const [user, setUser] = useState<userInterface>();

	return (
		<UserInfoContext.Provider value={{ user, setUser }}>
			{children}
		</UserInfoContext.Provider>
	);
};
