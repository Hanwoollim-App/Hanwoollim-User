import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/common/design/Responsive';

import ScreenWrapper from '../../common/ScreenWrapper';

const styles = StyleSheet.create({
	block: {
		height: heightPercentage(83),
		width: widthPercentage(335),
		borderRadius: widthPercentage(10),
		marginTop: heightPercentage(20),
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	blockTitle: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: fontPercentage(20),
		lineHeight: fontPercentage(25),
		fontWeight: '300',
		fontStyle: 'normal',
		letterSpacing: 0,
		textAlign: 'center',
		color: '#000000',
	},
	blockContent: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
		lineHeight: fontPercentage(16),
		fontWeight: 'normal',
		fontStyle: 'normal',
		letterSpacing: 0,
		textAlign: 'center',
		color: '#000000',
	},
});

function FlashMob() {
	return (
		<ScreenWrapper headerTitle="번개모임">
			<View style={styles.block}>
				<Text style={styles.blockTitle}>기능 준비중입니다</Text>
				<Text style={styles.blockContent}>조금만 기다려줘요... 약속?</Text>
			</View>
		</ScreenWrapper>
	);
}

export default FlashMob;
