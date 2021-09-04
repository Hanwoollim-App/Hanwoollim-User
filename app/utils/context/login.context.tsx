/* eslint-disable no-undef */
import React, { createContext, useState } from 'react';
import { PROFILE_EMPTY, TOKEN_EMPTY } from '../types/login.type';

export const LoginContext = createContext({});
export const LoginContextProvider = ({ children }) => {
	const [token, setToken] = useState(TOKEN_EMPTY);
	const [profile, setProfile] = useState(PROFILE_EMPTY);

	return (
		<LoginContext.Provider
			value={[
				{ token, setToken },
				{ profile, setProfile },
			]}>
			{children}
		</LoginContext.Provider>
	);
};
