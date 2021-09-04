import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { boardImage } from '../../../assets';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/api/responsive/responsive.api';

import ScreenWrapper from '../../layout/screen-wrapper/screen-wrapper.layout.tsx';

const styles = StyleSheet.create({
	block: {
		height: heightPercentage(83),
		width: widthPercentage(335),
		borderRadius: widthPercentage(10),
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
	board: {
		width: '100%',
		height: '40%',
		marginTop: '45%',
	},
	boardImg: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
});

export function Board() {
	return (
		<ScreenWrapper headerTitle="자료게시판">
			<View style={styles.board}>
				<Image source={boardImage} style={styles.boardImg} />
			</View>
			<View style={styles.block}>
				<Text style={styles.blockTitle}>기능 준비중입니다</Text>
				<Text style={styles.blockContent}>조금만 기다려줘요... 약속?</Text>
			</View>
		</ScreenWrapper>
	);
}
