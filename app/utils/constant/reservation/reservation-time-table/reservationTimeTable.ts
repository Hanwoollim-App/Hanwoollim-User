import { Item } from 'react-native-picker-select';

export const btnTitle: string = 'ᐸ  홈으로 돌아가기';

export const weekItems: Array<Item> = [];

const convertOneDigitToTwoDigit = (num: string) =>
	num.length === 1 ? `0${num}` : num;

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
	const prevMondayMonth = convertOneDigitToTwoDigit(
		(prevMonday.getMonth() + 1).toString(10),
	);

	const nextSundayMonth = convertOneDigitToTwoDigit(
		(nextSunday.getMonth() + 1).toString(10),
	);

	const prevMondayDate = convertOneDigitToTwoDigit(
		prevMonday.getDate().toString(10),
	);

	const nextMondayDate = convertOneDigitToTwoDigit(
		nextSunday.getDate().toString(10),
	);

	const content: string = `${prevMondayMonth}.${prevMondayDate}~${nextSundayMonth}.${nextMondayDate}`;

	weekItems.push({
		label: content,
		value: `${i}-${prevMonday.getFullYear()}`,
	});
}
