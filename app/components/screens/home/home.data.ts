import {
	EDay,
	IGetReservationData,
	IReservationGivenDataByDay,
	weekItems,
} from '../../../utils';
import { convertNumTimeToStringTime } from '../reservation/reservation-time-table/components/time-table.data';

export const dayMappingEMap = {
	0: EDay.SUN,
	1: EDay.MON,
	2: EDay.TUE,
	3: EDay.WEN,
	4: EDay.THUR,
	5: EDay.FRI,
	6: EDay.SAT,
};

export const convertCurrentDayReservationData = (data: IGetReservationData) => {
	const currentDay = dayMappingEMap[new Date().getDay()];
	const currentDayData = data[0]?.[currentDay];

	return currentDayData;
};

export const convertReservationDataToDescription = (
	data: IReservationGivenDataByDay,
) => {
	const startTime = convertNumTimeToStringTime(data.startTime);
	const endTime = convertNumTimeToStringTime(data.endTime);

	return `${startTime}-${endTime} ${data.name} (${data.session1})`;
};

export const currentWeekDate = weekItems[0].value as string;
