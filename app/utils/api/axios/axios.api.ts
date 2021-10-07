import axios, { AxiosResponse } from 'axios';
import { ValueType } from 'react-native-dropdown-picker';
import { UserInfoType } from './../../context/user-info.context';
import {
	IGetAnnounceMentType,
	IGetReservationData,
	IPostReservationData,
	ISignInDataType,
} from './type';

export const baseAxios = axios.create({
	baseURL: 'https://api.hanwoolim.n-e.kr',
});

baseAxios.defaults.headers.post['Content-Type'] = 'application/json';

export const userSignIn = (
	id: string,
	password: string,
): Promise<AxiosResponse<ISignInDataType>> => {
	return baseAxios.post<ISignInDataType>('/user/signIn', {
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

export const getNotice = (): Promise<AxiosResponse<IGetAnnounceMentType[]>> => {
	return baseAxios.get<IGetAnnounceMentType[]>('/manager/announcement');
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
	return baseAxios.get<IGetReservationData>('/user/reservation', {
		params: {
			startDate,
		},
	});
};

export const postReservation = (
	data: IPostReservationData,
): Promise<AxiosResponse> => {
	return baseAxios.post('/user/reservation', data);
};
