import {
	responsiveFontSize,
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const ZEPLIN__WINDOW__WIDTH = 375;
const ZEPLIN__WINDOW__HEIGHT = 812;

// https://github.com/react-native-toolkit/react-native-responsive-dimensions
// responsiveWidth(widthPercentage(37)) 처럼 zeplin에 뜨는 숫자 그대로 넣어주면 됩니다.
export const widthPercentage = (width: number) => {
	const percentage = (width / ZEPLIN__WINDOW__WIDTH) * 100;

	return responsiveWidth(percentage);
};
export const heightPercentage = (height: number) => {
	const percentage = (height / ZEPLIN__WINDOW__HEIGHT) * 100;

	return responsiveHeight(percentage);
};
export const fontPercentage = (size: number) => {
	const percentage = size * 0.125;

	return responsiveFontSize(percentage);
};
