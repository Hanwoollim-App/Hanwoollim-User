import React, {
	useState,
	createContext,
	ReactNode,
	useContext,
	SetStateAction,
} from 'react';

export type IUserInfoType = {
	userName: string;
	major: string;
	studentId: string;
};

export type UserInfoContextType = {
	user: IUserInfoType;
	setUser: (value: SetStateAction<IUserInfoType>) => void;
};

export type IUserInfoProviderProps = {
	children: ReactNode;
};

export const UserInfoContext = createContext<UserInfoContextType>(null);

export const UserInfoProvider = ({ children }: IUserInfoProviderProps) => {
	const [user, setUser] = useState<IUserInfoType>();

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
