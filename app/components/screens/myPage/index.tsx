import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/common/design/Responsive';
import ScreenWrapper from '../../common/ScreenWrapper';

const styles = StyleSheet.create({
	nameBlock: {
		height: heightPercentage(83),
		width: widthPercentage(335),
		marginTop: heightPercentage(20),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		justifyContent: 'center',
	},
	infoBlock: {
		height: heightPercentage(168),
		width: widthPercentage(335),
		marginTop: heightPercentage(20),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		justifyContent: 'center',
	},
	btnBlock: {
		height: heightPercentage(76),
		width: widthPercentage(335),
		marginTop: heightPercentage(20),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnBlock2: {
		height: heightPercentage(60),
		width: widthPercentage(335),
	},
	titleTextBlock: {
		height: heightPercentage(50),
		width: widthPercentage(74),
		marginLeft: widthPercentage(15),
	},
	infoTextBlock: {
		height: heightPercentage(84),
		width: widthPercentage(335),
		justifyContent: 'center',
		marginLeft: widthPercentage(15),
	},
	btnTextBlock: {
		height: heightPercentage(30),
		width: widthPercentage(335),
		justifyContent: 'center',
		marginLeft: widthPercentage(17),
	},
	hello: {
		color: '#00203f',
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
	},
	boldText: {
		color: 'black',
		fontFamily: 'NotoSansKR-Bold',
		fontSize: fontPercentage(20),
	},
	info: {
		color: 'black',
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(16),
	},
	btnText: {
		color: 'black',
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(13),
	},
});

function MyPage() {
	return (
		<ScreenWrapper headerTitle="개인정보 설정">
			<View style={styles.nameBlock}>
				<View style={styles.titleTextBlock}>
					<Text style={styles.hello}>안녕하세요,</Text>
					<Text style={styles.boldText}>김동현님</Text>
				</View>
			</View>
			<View style={styles.infoBlock}>
				<View style={styles.infoTextBlock}>
					<Text style={styles.boldText}>학과</Text>
					<Text style={styles.info}>정보시스템학과</Text>
				</View>
				<View style={styles.infoTextBlock}>
					<Text style={styles.boldText}>학번</Text>
					<Text style={styles.info}>2018777777</Text>
				</View>
			</View>
			<View style={styles.btnBlock}>
				<View style={styles.btnBlock2}>
					<View style={styles.btnTextBlock}>
						<TouchableOpacity>
							<Text style={styles.btnText}>{'개인정보수정 >'}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.btnTextBlock}>
						<TouchableOpacity>
							<Text style={styles.btnText}>{'회원탈퇴하기 >'}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScreenWrapper>
	);
}

export default MyPage;
