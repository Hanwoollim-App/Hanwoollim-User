import {Item} from "react-native-picker-select";

export const dayItems : Array<Item> = [
	{label: "월요일", value: {itemValue: "day", num: 1}},
	{label: "화요일", value: {itemValue: "day", num: 2}},
	{label: "수요일", value: {itemValue: "day", num: 3}},
	{label: "목요일", value: {itemValue: "day", num: 4}},
	{label: "금요일", value: {itemValue: "day", num: 5}},
	{label: "토요일", value: {itemValue: "day", num: 6}},
	{label: "일요일", value: {itemValue: "day", num: 7}},
];

export const unitItems : Array<Item> = [
	{label: "개인", value: {itemValue: "unit", num: 1}},
	{label: "팀", value: {itemValue: "unit", num: 2}},
];

export const sectionItems = [
	{label: "기타", value: {itemValue: "session", seesionID: 1, num: 4}},
	{label: "베이스", value: {itemValue: "session", sessionID: 1, num: 1}},
	{label: "드럼", value: {itemValue: "session", sessionID: 2, num: 4}},
	{label: "건반", value: {itemValue: "session", sessionID: 2, num: 2}},
	{label: "보컬", value: {itemValue: "session", sessionID: 2, num: 1}},
];

export const timeItems : Array<Item> = [];

for (let i = 0; i < 24; i++) {
	timeItems.push({
		label: `${i}시~${i + 1}시`,
		value: {itemValue: "time", num: i},
	});
}

export const PROCESS_TEXT = {
	UNIT: "예약 단위",
	TIME: "에약 시간",
	ALERT: "하루에 개인당 최대 한시간만 예약이 가능합니다",
	SECTION_ADD: "세션 추가하기 (최대 2개)",
	SUBMIT: "예약 확정하기",
	SECTION: "세션",
};

export const MODAL_TEXT = {
	TITLE: "예약이 완료되었습니다",
	BTN_TITLE: "확인",
};
