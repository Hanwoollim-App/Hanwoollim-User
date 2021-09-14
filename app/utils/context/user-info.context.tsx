import React, {
	useState,
	createContext,
	ReactNode,
	useContext,
	SetStateAction,
} from 'react';

export type UserInfoType = {
	userName: string;
	major: string;
	studentId: number;
	position: string;
};

export type UserInfoContextType = {
	user: UserInfoType;
	setUser: (value: SetStateAction<UserInfoType>) => void;
};

export type UserInfoProviderProps = {
	children: ReactNode;
};

export const UserInfoContext = createContext<UserInfoContextType>(null);

export const UserInfoProvider = ({ children }: UserInfoProviderProps) => {
	const [user, setUser] = useState<UserInfoType>();

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
