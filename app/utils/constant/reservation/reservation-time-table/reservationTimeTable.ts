import { Item } from 'react-native-picker-select';

export const btnTitle: string = 'ᐸ  홈으로 돌아가기';

export const weekItem: Array<Item> = [];

for (let i: number = 1; i <= 5; i++) {
	const curDate: Date = new Date();

	curDate.setDate(curDate.getDate() + (i - 1) * 7);

	const prevMonday: Date = new Date(curDate);
	const nextSunday: Date = new Date(curDate);

	if (prevMonday.getDay() !== 1) {
		prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() - 1));
	}
	if (nextSunday.getDay() !== 7) {
		nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()));
	}
	const content: string = `${
		prevMonday.getMonth() + 1
	}.${prevMonday.getDate()}~${
		nextSunday.getMonth() + 1
	}.${nextSunday.getDate()}`;

	weekItem.push({
		label: content,
		value: {
			weekNum: i,
			monday: prevMonday,
		},
	});
}
