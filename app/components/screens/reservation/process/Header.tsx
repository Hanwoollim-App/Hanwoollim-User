import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomBtn from '../../../common/CustomBtn';
import color from '../../../../utils/constant/common/design/Color';
import btnTitle from '../../../../utils/constant/reservation/process/HeaderUtil';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../../utils/constant/common/design/Responsive';

const styles = StyleSheet.create({
	haeder__back__btn: {
		width: widthPercentage(101),
		height: heightPercentage(26),
		marginLeft: widthPercentage(16),
	},
	header__back__text: {
		width: '100%',
		height: '100%',
		fontFamily: 'KoreanYNSJG3',
		fontSize: fontPercentage(12),
		letterSpacing: 0,
		color: color.mainColor,
	},
	header__title: {
		width: widthPercentage(124),
		height: heightPercentage(33),
		marginLeft: 111,
	},
	header__title__text: {
		width: '100%',
		height: '100%',
		fontFamily: 'KoreanYNSJG4',
		fontSize: fontPercentage(14),
		letterSpacing: 0,
	},
});

function Header({ currentWeek }: { currentWeek: string }) {
	const navigation = useNavigation();
	const backBtnClickListener = () => {
		navigation.goBack();
	};

	return (
		<>
			<CustomBtn
				title={btnTitle}
				btnStyle={styles.haeder__back__btn}
				titleStyle={styles.header__back__text}
				onClickListener={backBtnClickListener}
			/>
			<View style={styles.header__title}>
				<Text style={styles.header__title__text}>{`${currentWeek}`}</Text>
			</View>
		</>
	);
}

export default Header;
