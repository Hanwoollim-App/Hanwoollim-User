import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/common/design/Responsive';
import ScreenWrapper from '../../common/ScreenWrapper';

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
	},
	titleBox: {
		width: widthPercentage(335),
		height: heightPercentage(72),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		marginTop: heightPercentage(20),
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	title: {
		width: '90%',
		height: heightPercentage(24),
		fontFamily: 'NotoSansKR-Bold',
		fontSize: fontPercentage(16),
		color: '#000000',
	},
	date: {
		width: widthPercentage(60),
		height: heightPercentage(17),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
		color: '#808080',
	},
	writer: {
		height: heightPercentage(17),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
		color: '#808080',
	},
	titleRow: {
		width: '90%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	postBox: {
		width: widthPercentage(335),
		height: heightPercentage(223),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		marginTop: heightPercentage(15),
	},
	post: {
		width: widthPercentage(303),
		height: heightPercentage(207),
		marginLeft: widthPercentage(16),
		marginTop: heightPercentage(13),
		color: '#000000',
	},
	postText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
		justifyContent: 'center',
		textAlign: 'left',
		alignItems: 'center',
	},
	btnStyle: {
		width: widthPercentage(290),
		height: heightPercentage(53),
		borderRadius: widthPercentage(21),
		backgroundColor: '#00203f',
		shadowColor: 'rgba(0, 0, 0, 0.16)',
		shadowOffset: {
			width: 0,
			height: heightPercentage(3),
		},
		shadowRadius: widthPercentage(6),
		shadowOpacity: 1,
		marginTop: heightPercentage(300),
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTextStyle: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: fontPercentage(20),
		justifyContent: 'center',
		textAlign: 'center',
		color: '#ffffff',
	},
});

function NoticeDetail() {
	return (
		<ScreenWrapper headerTitle="공지사항">
			<View style={styles.titleBox}>
				<Text style={styles.title}>한울림 공지사항</Text>
				<View style={styles.titleRow}>
					<Text style={styles.date}>2021.01.01</Text>
					<Text style={styles.writer}>작성자 관리자</Text>
				</View>
			</View>
			<View style={styles.postBox}>
				<View style={styles.post}>
					<Text style={styles.postText}>ㅁㄴㅇㄹ</Text>
				</View>
			</View>
		</ScreenWrapper>
	);
}

export default NoticeDetail;
