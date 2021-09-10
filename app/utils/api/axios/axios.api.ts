import { userInfoType } from './../../context/user-info.context';
import axios, { AxiosResponse } from 'axios';
import { ValueType } from '../../types/drop-down.type';

export interface signInDataInterface {
	accessToken: string;
	position: string;
}

export const baseAxios = axios.create({
	baseURL: 'https://api.hanwoolim.n-e.kr',
});

baseAxios.defaults.headers.post['Content-Type'] = 'application/json';

export const userSignIn = (
	id: string,
	password: string,
): Promise<AxiosResponse<any>> => {
	return baseAxios.post<signInDataInterface>('/user/signIn', {
		id,
		password,
	});
};

export const updateAuthToken = (accessToken: string): void => {
	baseAxios.defaults.headers['x-access-token'] = accessToken;
};

export const userSignUp = (
	id: string,
	password: string,
	userName: string,
	major: ValueType,
	studentId: string,
): Promise<AxiosResponse<any>> => {
	return baseAxios.post('/user/signUp', {
		id,
		password,
		userName,
		major,
		studentId,
	});
};

export const getUserInfo = (): Promise<AxiosResponse<userInfoType>> => {
	return baseAxios.get('/user/info');
};

export const getNotice = async (
	setNoticeData: Function,
): Promise<void | AxiosResponse<any>> => {
	return baseAxios.get('/manager/announcement').then((res) => {
		setNoticeData(res.data);
	});
};

export const editUserInfo = (
	userName: string,
	major: ValueType,
	studentId: string,
): Promise<AxiosResponse<userInfoType>> => {
	return baseAxios.patch('/user/editInfo', {
		userName,
		major,
		studentId,
	});
};

export const executeUser = (): Promise<AxiosResponse<userInfoType>> => {
	return baseAxios.post('/user/info', {
		execute: 1,
	});
};
