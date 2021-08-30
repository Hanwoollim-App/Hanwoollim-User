import axios from 'axios';
import { signInDataInterface } from './type';
import { ValueType } from '../../../utils/types/dropDown';

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
