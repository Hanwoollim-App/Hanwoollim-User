import axios from 'axios';
import { ValueType } from '../../types/drop-down.type';

export interface signInDataInterface {
	accessToken: string;
	position: string;
}

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

export async function getUserInfo() {
	return api.get('/user/info');
}

export function getNotice(setNoticeData) {
	return api.get('/manager/announcement').then((res) => {
		setNoticeData(res.data);
	});
}
