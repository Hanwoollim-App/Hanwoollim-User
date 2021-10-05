import axios, { AxiosResponse } from 'axios';
import { UserInfoType } from './../../context/user-info.context';
import { ValueType } from '../../types/drop-down.type';
import { AnnounceMentType, IGetReservationData, signInDataType } from './type';

export const baseAxios = axios.create({
	baseURL: 'https://api.hanwoolim.n-e.kr',
});

baseAxios.defaults.headers.post['Content-Type'] = 'application/json';

export const userSignIn = (
	id: string,
	password: string,
): Promise<AxiosResponse<signInDataType>> => {
	return baseAxios.post<signInDataType>('/user/signIn', {
		id,
		password,
	});
};

export const updateAuthToken = (accessToken: string): void => {
	baseAxios.defaults.headers.common['x-access-token'] = accessToken;
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

export const getUserInfo = (): Promise<AxiosResponse<UserInfoType>> => {
	return baseAxios.get<UserInfoType>('/user/info');
};

export const getNotice = (): Promise<AxiosResponse<AnnounceMentType>> => {
	return baseAxios.get<AnnounceMentType>('/manager/announcement');
};

export const editUserInfo = (
	userName: string,
	major: ValueType,
	studentId: string,
): Promise<AxiosResponse<UserInfoType>> => {
	return baseAxios.patch('/user/editInfo', {
		userName,
		major,
		studentId,
	});
};

export const executeUser = (): Promise<AxiosResponse<UserInfoType>> => {
	return baseAxios.post('/user/info', {
		execute: 1,
	});
};

export const getReservation = (
	startDate: string,
): Promise<AxiosResponse<IGetReservationData>> => {
	return baseAxios.get('/user/reservation', {
		params: {
			startDate,
		},
	});
};
