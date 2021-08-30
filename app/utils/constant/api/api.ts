import axios from 'axios';
import { useContext } from 'react';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import { signInDataInterface } from './type';
import { ValueType } from '../../../utils/types/dropDown';
import userInterface, {
	UserInfoContext,
} from '../../../utils/context/UserInfoContext';

export const api = axios.create({
	baseURL: 'https://api.hanwoolim.n-e.kr',
});

api.defaults.headers.post['Content-Type'] = 'application/json';

export function userSignIn(id: string, password: string) {
	return api.post<signInDataInterface>('/user/signIn', {
		id,
		password,
	});
}

export function updateAuthToken(accessToken: string) {
	api.defaults.headers['x-access-token'] = accessToken;
}

export function userSignUp(
	id: string,
	password: string,
	userName: string,
	major: ValueType,
	studentId: string,
) {
	return api.post('/user/signUp', {
		id,
		password,
		userName,
		major,
		studentId,
	});
}

export async function getUserInfo(path: string) {
	const { setUser }: userInterface = useContext(UserInfoContext);
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	return api.get('/user/info').then((res) => {
		const { userName, major, studentId } = res.data;

		setUser((prevUser) => ({
			...prevUser,
			userName,
			major,
			studentId,
		}));
		navigation.navigate(path);
	});
}
