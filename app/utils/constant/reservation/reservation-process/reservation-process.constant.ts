import { Item } from 'react-native-picker-select';

export const dayItems: Array<Item> = [
	{ label: '월요일', value: { itemValue: 'day', num: 1 } },
	{ label: '화요일', value: { itemValue: 'day', num: 2 } },
	{ label: '수요일', value: { itemValue: 'day', num: 3 } },
	{ label: '목요일', value: { itemValue: 'day', num: 4 } },
	{ label: '금요일', value: { itemValue: 'day', num: 5 } },
	{ label: '토요일', value: { itemValue: 'day', num: 6 } },
	{ label: '일요일', value: { itemValue: 'day', num: 7 } },
];

export const unitItems: Array<Item> = [
	{ label: '개인', value: { itemValue: 'unit', num: 1 } },
	{ label: '팀', value: { itemValue: 'unit', num: 2 } },
];

export const sectionItems: Array<Item> = [
	{ label: '기타1', value: { itemValue: 'session', num: 1 } },
	{ label: '기타2', value: { itemValue: 'session', num: 2 } },
	{ label: '베이스', value: { itemValue: 'session', num: 3 } },
	{ label: '드럼', value: { itemValue: 'session', num: 4 } },
	{ label: '건반', value: { itemValue: 'session', num: 5 } },
	{ label: '보컬', value: { itemValue: 'session', num: 6 } },
];

export const timeItems: Array<Item> = [];

for (let i = 0; i < 24; i++) {
	timeItems.push({
		label: `${i}시~${i + 1}시`,
		value: { itemValue: 'time', num: i },
	});
}

export const times: Array<Item> = [];

for (let i = 0; i < 24; i++) {
	times.push({
		label: `${i}`,
		value: `${i}`,
	});
}

export const timeBoxes: Array<Item> = [];

for (let i = 0; i < 48; i++) {
	timeBoxes.push({
		label: `${i}`,
		value: `${i}`,
	});
}

export const PROCESS_TEXT = {
	UNIT: '예약 단위',
	TIME: '예약 시간',
	ALERT: '하루에 개인당 최대 한시간만 예약이 가능합니다',
	SECTION_ADD: '세션 추가하기 (최대 2개)',
	SUBMIT: '예약 확정하기',
	SECTION: '세션',
};

export const MODAL_TEXT = {
	SUCCESS_TITLE: '예약이 완료되었습니다',
	NO_TEAM_TITLE: '팀 예약은 안 되요!',
	FAILED: '무언가 잘못됐어요!',
	DRUM_NUM_OVER: '드럼은 한명만!',
	KEYBOARD_NUM_OVER: '건반은 한명만!',
	BASE_NUM_OVER: '베이스는 한명만!',
	VOCAL_NUM_OVER: '보컬은 한명만!',
	GUITAR_NUM_OVER: '기타는 두명만!',
	NOT_VALID_TWO_GUITAR_SELECT: '기타1 과 기타2로 선택해주세요!',
	BTN_TITLE: '확인',
};

export interface reserveDataInterface {
	session1: number;
	session2: number;
	Id: number;
	date: Date;
}

const sessionDataCalculation = (value) => {
	const { sessionID: ID, num } = value;
	const ret = {
		session1: 0,
		session2: 0,
		isValid: true,
		NOT_VALID_TEXT: '',
	};

	switch (ID) {
		case 1:
			ret.session1 += num;
			break;
		case 2:
			ret.session2 += num;
			break;
		default:
			ret.isValid = false;
			ret.NOT_VALID_TEXT = MODAL_TEXT.FAILED;
	}
	return ret;
};

const dataResultsCalculation = (dataResults) => {
	const ret = {
		sessionData1: 0,
		sessionData2: 0,
		isValid: true,
		NOT_VALID_TEXT: '',
	};

	dataResults.forEach((data) => {
		ret.sessionData1 += data.session1;
		ret.sessionData2 += data.session2;
		if (ret.isValid === false) return;
		ret.isValid = data.isValid;
		ret.NOT_VALID_TEXT = data.NOT_VALID_TEXT;
	});
	return ret;
};
const checkTwoSessionDuplicated = (value1, value2) => {
	const { sessionID: ID1, num: num1 } = value1;
	const { sessionID: ID2, num: num2 } = value2;
	const ret = {
		isValid: true,
		NOT_VALID_TEXT: '',
	};

	if (ID1 === ID2 && num1 === num2) {
		ret.isValid = false;
		// 기타가 아닌 경우
		if (!(ID1 === 1 && num1 === 4) && !(ID1 === 1 && num2 === 2)) {
			// 베이스
			if (ID1 === 1 && num1 === 1) {
				ret.NOT_VALID_TEXT = MODAL_TEXT.BASE_NUM_OVER;
				return ret;
			}
			// 드럼
			if (ID1 === 2 && num1 === 4) {
				ret.NOT_VALID_TEXT = MODAL_TEXT.DRUM_NUM_OVER;
				return ret;
			}
			// 건반
			if (ID1 === 2 && num1 === 2) {
				ret.NOT_VALID_TEXT = MODAL_TEXT.KEYBOARD_NUM_OVER;
				return ret;
			}
			// 보컬
			if (ID1 === 2 && num1 === 1) {
				ret.NOT_VALID_TEXT = MODAL_TEXT.VOCAL_NUM_OVER;
				return ret;
			}
		}
		ret.NOT_VALID_TEXT = MODAL_TEXT.NOT_VALID_TWO_GUITAR_SELECT;
		return ret;
	}
	return ret;
};

export const oneSessionSelected = (value1) => {
	const dataResults = [sessionDataCalculation(value1)];

	return dataResultsCalculation(dataResults);
};

export const twoSessionsSelected = (value1, value2) => {
	const isDuplicated = checkTwoSessionDuplicated(value1, value2);

	if (isDuplicated.isValid === false) {
		return isDuplicated;
	}
	const dataResults = [
		sessionDataCalculation(value1),
		sessionDataCalculation(value2),
	];

	return dataResultsCalculation(dataResults);
};

export const threeSessionSelected = (value1, value2, value3) => {
	const isDuplicated = [
		checkTwoSessionDuplicated(value1, value2),
		checkTwoSessionDuplicated(value1, value3),
		checkTwoSessionDuplicated(value2, value3),
	];

	isDuplicated.forEach((validation) => {
		if (validation.isValid === false) {
			isDuplicated[4] = validation;
		}
	});

	if (isDuplicated[4] !== undefined) {
		return isDuplicated[4];
	}

	const dataResults = [
		sessionDataCalculation(value1),
		sessionDataCalculation(value2),
		sessionDataCalculation(value3),
	];

	return dataResultsCalculation(dataResults);
};

export const dateDataCalculation = (date: Date, time: number) => {
	const ret = new Date(date);

	ret.setHours(time);
	ret.setMinutes(0);
	ret.setSeconds(0);
	ret.setMilliseconds(0);
	return ret;
};
