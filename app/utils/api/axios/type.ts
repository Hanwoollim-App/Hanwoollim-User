export type AnnounceMentType = {
	id: number;
	title: string;
	date: string;
	writer: string;
	body: string;
};

export type signInDataType = {
	accessToken: string;
	position: string;
};

export type IReservationDataByDay = {
	isMine: boolean;
	name: string;
	startTime: number;
	endTime: number;
	session1: string;
	session2: string;
};

export type IGetReservationData = {
	startDate: string;
	reservationType: string;
	MON: IReservationDataByDay[];
	TUE: IReservationDataByDay[];
	WEN: IReservationDataByDay[];
	THU: IReservationDataByDay[];
	FRI: IReservationDataByDay[];
	SAT: IReservationDataByDay[];
	SUN: IReservationDataByDay[];
};
