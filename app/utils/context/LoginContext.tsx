/* eslint-disable no-undef */
import React, { createContext, useState } from 'react';
import { PROFILE_EMPTY, TOKEN_EMPTY } from '../constant/login/login';

export const LoginContext = createContext({});
export const LoginContextProvider = ({ children }: any) => {
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
