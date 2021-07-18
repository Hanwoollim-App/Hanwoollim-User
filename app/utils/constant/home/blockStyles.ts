import { StyleSheet } from 'react-native';
import {
	fontPercentage,
	widthPercentage,
	heightPercentage,
} from './../common/design/Responsive';

const blockStyles = StyleSheet.create({
	root: {
		height: heightPercentage(150),
		width: '100%',
		paddingHorizontal: '3.6%',
		paddingVertical: heightPercentage(13),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		flex: 1.5,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	titleText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(20),
		lineHeight: fontPercentage(25),
		fontWeight: 'bold',
		fontStyle: 'normal',
		letterSpacing: 0,
		textAlign: 'left',
		color: '#000000',
	},
	titleBtn: {
		width: '15%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	contents: {
		paddingTop: heightPercentage(5),
		flex: 4,
		width: '100%',
	},
});

export default blockStyles;
