import axios, { AxiosResponse } from 'axios';
import { EDay } from '.';
import { IUserInfoType as IGetUserInfoType } from './../../context/user-info.context';
import {
	IGetAnnounceMentType,
	IGetReservationData,
	IPatchUserInfo,
	IPostReservationData,
	IReservationType,
	ISignInDataType,
} from './type';

export const baseAxios = axios.create({
	baseURL: 'https://api.hanwoolim.n-e.kr',
});

baseAxios.defaults.headers.post['Content-Type'] = 'application/json';

export const postUserSignIn = (
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

export const postUserSignUp = (
	id: string,
	password: string,
	userName: string,
	major: string,
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

export const getUserInfo = (): Promise<AxiosResponse<IGetUserInfoType>> => {
	return baseAxios.get<IGetUserInfoType>('/user/info');
};

export const getNotice = (): Promise<AxiosResponse<IGetAnnounceMentType[]>> => {
	return baseAxios.get<IGetAnnounceMentType[]>('/manager/announcement');
};

export const patchUserInfo = (
	userName: string,
	major: string,
	studentId: string,
): Promise<AxiosResponse<IPatchUserInfo>> => {
	return baseAxios.patch<IPatchUserInfo>('/user/editInfo', {
		userName,
		major,
		studentId,
	});
};

export const postUserInfo = (): Promise<AxiosResponse<IGetUserInfoType>> => {
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
	console.log(data);
	return baseAxios.post('/user/reservation', data);
};

export const deleteReservation = (
	startDate: string,
	reservationType: IReservationType,
	day: EDay,
	startTime: number,
) => {
	return baseAxios.delete(
		`/user/reservation/delete/${startDate}/${reservationType}/${day}/${startTime}`,
	);
};
