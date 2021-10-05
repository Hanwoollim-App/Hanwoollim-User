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

export type IReservationGivenDataByDay = {
	isMine: boolean;
	name: string;
	startTime: number;
	endTime: number;
	session1: string;
	session2: string;
};

export type IReservationPostingData = {
	startTime: number;
	endTime: number;
	session1: string;
	session2?: string;
};

export type IGetReservationData = {
	startDate: string;
	reservationType: string;
	MON: IReservationGivenDataByDay[];
	TUE: IReservationGivenDataByDay[];
	WEN: IReservationGivenDataByDay[];
	THUR: IReservationGivenDataByDay[];
	FRI: IReservationGivenDataByDay[];
	SAT: IReservationGivenDataByDay[];
	SUN: IReservationGivenDataByDay[];
};

export type IPostReservationData = {
	startDate: string;
	reservationType: string;
	MON?: IReservationPostingData;
	TUE?: IReservationPostingData;
	WEN?: IReservationPostingData;
	THUR?: IReservationPostingData;
	FRI?: IReservationPostingData;
	SAT?: IReservationPostingData;
	SUN?: IReservationPostingData;
};
