import axios from 'axios';
import { signInDataInterface } from './type';

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
