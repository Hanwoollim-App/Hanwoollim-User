import {Item} from "react-native-picker-select";

const getWeekNumber = (date : Date) => {
	// 요일별로 월요일을 계산
	let latestMondayDate;

	switch (date.getDay()) {
		case 0: // 일요일
			latestMondayDate = date.getDate() - 6;
			break;
		case 1: // 월요일
			latestMondayDate = date.getDate();
			break;
		case 2: // 화요일
			latestMondayDate = date.getDate() - 1;
			break;
		case 3: // 수요일
			latestMondayDate = date.getDate() - 2;
			break;
		case 4: // 목요일
			latestMondayDate = date.getDate() - 3;
			break;
		case 5: // 금요일
			latestMondayDate = date.getDate() - 4;
			break;
		default: // 토요일
			latestMondayDate = date.getDate() - 5;
			break;
	}

	if (latestMondayDate < 0) return 1;
	const currentWeekNumber = latestMondayDate % 7 + 1;

	return currentWeekNumber;
};

const weekItem : Array<Item> = [];

for (let i : number = 1; i <= 2; i++) {
	const date = new Date();

	weekItem.push({
		"label": `${date.getFullYear()}.${date.getMonth() + 1}.${getWeekNumber(date) + (i - 1)}주차`,
		"value": `${i}`,
	});
}

export default weekItem;
