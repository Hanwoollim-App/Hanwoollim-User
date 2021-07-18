import React from 'react';
import {
	StyleSheet,
	BackHandler,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAndroidBackHandler } from 'react-navigation-backhandler';
import {
	fontPercentage,
	heightPercentage,
} from '../../../utils/constant/common/design/Responsive';
import ScreenWrapper from '../../common/ScreenWrapper';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Notice from './Notice';

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

const tempValue: any = {
	userName: '김동현',
};

function Home() {
	useAndroidBackHandler(() => {
		BackHandler.exitApp();
		return true;
	});

	return (
		<ScreenWrapper>
			<View style={styles.title}>
				<Text style={styles.titleText}>{tempValue.userName} 님</Text>
				<TouchableOpacity style={styles.titleSetting}>
					{settingIcon}
				</TouchableOpacity>
			</View>
			<Notice />
		</ScreenWrapper>
	);
}

export default Home;
