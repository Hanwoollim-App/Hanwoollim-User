import React, { useContext } from 'react';
import {
	StyleSheet,
	BackHandler,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAndroidBackHandler } from 'react-navigation-backhandler';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/common/design/Responsive';
import ScreenWrapper from '../../common/ScreenWrapper';
import { UserInfoContext } from '../../../utils/context/UserInfoContext';

const styles = StyleSheet.create({
	title: {
		height: heightPercentage(65),
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	titleText: {
		height: heightPercentage(35),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(24),
		lineHeight: fontPercentage(32),
		letterSpacing: 0,
		fontWeight: 'bold',
		fontStyle: 'normal',
		textAlign: 'left',
		color: '#000000',
	},
	titleSetting: {
		height: heightPercentage(35),
		justifyContent: 'center',
		alignItems: 'center',
	},
	block: {
		height: heightPercentage(135),
		width: widthPercentage(335),
		borderRadius: widthPercentage(10),
		marginTop: heightPercentage(14),
		backgroundColor: '#ffffff',
		alignItems: 'center',
	},
	blockTitle: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: fontPercentage(20),
		textAlign: 'center',
		color: '#000000',
		marginTop: heightPercentage(32),
	},
	blockContent: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
		textAlign: 'center',
		color: '#000000',
		marginTop: heightPercentage(15),
	},
});

const settingIcon = (
	<FontAwesomeIcon
		style={{
			color: '#000000',
		}}
		size={fontPercentage(24)}
		icon={faCog}
	/>
);

function NotApproved() {
	useAndroidBackHandler(() => {
		BackHandler.exitApp();
		return true;
	});
	const { user }: any = useContext(UserInfoContext);

	return (
		<ScreenWrapper>
			<View style={styles.title}>
				<Text style={styles.titleText}>{user.userName} 님</Text>
				<TouchableOpacity style={styles.titleSetting}>
					{settingIcon}
				</TouchableOpacity>
			</View>
			<View style={styles.block}>
				<Text style={styles.blockTitle}>아직 승인되지 않은 계정입니다</Text>
				<Text style={styles.blockContent}>관리자에게 문의해주세요</Text>
			</View>
		</ScreenWrapper>
	);
}

export default NotApproved;
