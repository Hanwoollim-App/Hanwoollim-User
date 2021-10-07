import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../../../utils';

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

export function Header({ currentWeek }: { currentWeek: string }) {
	return (
		<View style={styles.header__title}>
			<Text style={styles.header__title__text}>{`${currentWeek}`}</Text>
		</View>
	);
}
