import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomBtn from '../../../layout/custom-btn/custom-btn.layout';
import color from '../../../../utils/constant/color/color.data';
import btnTitle from '../../../../utils/constant/reservation/process/header';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../../utils/constant/responsive/responsive.api';

const styles = StyleSheet.create({
	header__title: {
		width: widthPercentage(124),
		height: heightPercentage(33),
		marginLeft: 111,
	},
	header__title__text: {
		width: '100%',
		height: '100%',
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(14),
		letterSpacing: 0,
	},
});

function Header({ currentWeek }: { currentWeek: string }) {
	return (
		<>
			<View style={styles.header__title}>
				<Text style={styles.header__title__text}>{`${currentWeek}`}</Text>
			</View>
		</>
	);
}

export default Header;
