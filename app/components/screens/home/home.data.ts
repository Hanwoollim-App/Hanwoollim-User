import { EDay, IGetReservationData, weekItems } from '../../../utils';

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

export const currentWeekDate = weekItems[0].value as string;
