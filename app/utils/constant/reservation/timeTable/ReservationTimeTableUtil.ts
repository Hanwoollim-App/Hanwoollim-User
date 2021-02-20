import {Item} from "react-native-picker-select";

const getPreviousMonday : (curDate: Date) => Date = (curDate) => {
	const prevMonday = new Date();

	if (curDate.getDay() !== 0) {
		prevMonday.setDate(curDate.getDate() - (curDate.getDay() - 1));
	}
	return prevMonday;
};

const getNextSunday : (curDate: Date) => Date = (curDate) => {
	const nextSunday = new Date();

	if (curDate.getDate() !== 6) {
		nextSunday.setDate(curDate.getDate() + (7 - curDate.getDay()));
	}
	return nextSunday;
};

const weekItem : Array<Item> = [];

for (let i : number = 1; i <= 2; i++) {
	const curDate = new Date();

	curDate.setDate(curDate.getDate() + (i - 1) * 7);
	const prevMonday : Date = getPreviousMonday(curDate);
	const nextSunday : Date = getNextSunday(curDate);
	const content : string = `${prevMonday.getMonth() + 1}.${prevMonday.getDate()}~${nextSunday.getMonth() + 1}.${nextSunday.getDate()}`;

	weekItem.push({
		"label": content,
		"value": content,
	});
}

export default weekItem;
