import {
	widthPercentage,
	heightPercentage,
	convertOneDigitToTwoDigit,
	IReservationGivenDataByDay,
} from '../../../../../utils';

export const generateTimes = (startTime: number, endTime: number) => {
	const times = [];

	for (let i = startTime; i < endTime; i += 1) {
		times.push(i);
	}
	return times;
};

export const times = generateTimes(0, 24);

export const week = ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT', 'SUN'];

export const xPosGenerator = (day: number): number => {
	return widthPercentage(46 * day) + 14;
};

export const yPosGenerator = (time: string): number => {
	return heightPercentage(
		parseInt(time.slice(0, 2), 10) * 46 +
			(parseInt(time.slice(3), 10) / 30) * 23 +
			20,
	);
};

export const heightGenerator = (start: string, end: string) => {
	return Math.abs(parseInt(start.slice(3), 10) - parseInt(end.slice(3), 10))
		? heightPercentage(23)
		: heightPercentage(46);
};

export const colorGenerator = (num: number) => {
	const colorList = [
		'rgba(246,206,218,1)',
		'rgba(250,227,209,1)',
		'rgba(248,238,207,1)',
		'rgba(224,245,214,1)',
		'rgba(215,235,252,1)',
		'rgba(235,217,244,1)',
		'rgba(228,223,217,1)',
		'rgba(212,196,251,1)',
		'rgba(193,225,197,1)',
		'rgba(190,211,243,1)',
		'#81E1B8',
		'rgba(190,218,220,1)',
		'rgba(254,243,189,1)',
		'rgba(247,141,167,1)',
		'rgba(196,222,246,1)',
		'rgba(250,208,195,1)',
		'#cc9af4',
		'#f8b3eb',
		'#ff8080',
		'#9af49f',
		'#9aeff4',
		'#a8e6cf',
		'#fdffab',
		'rgba(0,208,132,0.9)',
		'rgba(217,227,240,0.9)',
		'rgba(105,108,137,0.8)',
		'rgba(142,209,252,0.9)',
		'rgba(6,147,227,0.8)',
		'rgba(153,0,239,0.9)',
		'rgba(235,20,76,0.9)',
		'rgba(83,0,235,1)',
		'rgba(18,115,222,1)',
		'rgba(0,107,118,1)',
		'rgba(129,199,132,1)',
		'rgba(184,0,0,1)',
	];

	return colorList[num % colorList.length];
};

export const convertNumTimeToStringTime = (numTime: number) =>
	`${convertOneDigitToTwoDigit(numTime.toString(10))}:00`;

export const convertReservationDataFormat = (
	givenData: IReservationGivenDataByDay,
) => ({
	isMine: givenData.isMine,
	name: givenData.name,
	startTime: convertNumTimeToStringTime(givenData.startTime),
	endTime: convertNumTimeToStringTime(givenData.endTime),
	session1: givenData.session1,
});
