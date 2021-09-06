import { RouteProp } from '@react-navigation/native';

export interface NoticeItemInterface {
	title: string;
	date: string;
	id: string;
}

export type ParamList = {
	data: {
		title: string;
		date: string;
		writer: string;
		body: string;
	};
};

export type noticeDataParamList = RouteProp<ParamList, 'data'>;
