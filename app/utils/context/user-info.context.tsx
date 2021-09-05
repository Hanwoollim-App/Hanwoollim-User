import React, {
	useState,
	createContext,
	ReactNode,
	useContext,
	Dispatch,
	SetStateAction,
} from 'react';

export type userInfoType = {
	userName: string;
	major: string;
	studentId: number;
	position: string;
};

export type userInfoContextType = {
	user: userInfoType;
	setUser:
		| Dispatch<userInfoType>
		| Dispatch<SetStateAction<null | userInfoType>>
		| ((prevUser: userInfoType) => void);
};

export type userInfoProviderProps = {
	children: ReactNode;
};

export const UserInfoContext = createContext<userInfoContextType>(null);

export const UserInfoProvider = ({ children }: userInfoProviderProps) => {
	const [user, setUser] = useState<userInfoType>();

	return (
		<UserInfoContext.Provider value={{ user, setUser }}>
			{children}
		</UserInfoContext.Provider>
	);
};

const useUserInfoContext = () => {
	const context = useContext(UserInfoContext);

	if (!context) {
		throw new Error('useUserInfo must be used within a UserInfoContext');
	}

	return context;
};

export const useUserInfo = () => {
	const { user, setUser } = useUserInfoContext();

	return {
		user,
		setUser,
	};
};
