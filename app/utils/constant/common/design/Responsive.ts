const ZEPLIN__WINDOW__WIDTH = 375;
const ZEPLIN__WINDOW__HEIGHT = 812;

// https://github.com/react-native-toolkit/react-native-responsive-dimensions
// responsiveWidth(widthPercentage(37)) 처럼 zeplin에 뜨는 숫자 그대로 넣어주면 됩니다.
export const widthPercentage = (width: number) => (width / ZEPLIN__WINDOW__WIDTH) * 100;
export const heightPercentage = (height: number) => (height / ZEPLIN__WINDOW__HEIGHT) * 100;
