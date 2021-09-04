import React, { useContext } from 'react';
import {
	StyleSheet,
	BackHandler,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAndroidBackHandler } from 'react-navigation-backhandler';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import {
	fontPercentage,
	heightPercentage,
} from '../../../utils/api/responsive/responsive.api';
import ScreenWrapper from '../../layout/screen-wrapper/screen-wrapper.layout.tsx';
import Notice from './components/notice.home.component';
import TodayReservation from './components/today-reservation.home.component';
import MyReservation from './components/my-reservation.home.component';
import userInterface, {
	UserInfoContext,
} from '../../../utils/context/user-info.context';

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

export function Home() {
	useAndroidBackHandler(() => {
		BackHandler.exitApp();
		return true;
	});
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const myPageBtnListener = () => {
		navigation.navigate('MyPage');
	};
	const { user }: userInterface = useContext(UserInfoContext);

	return (
		<ScreenWrapper>
			<View style={styles.title}>
				<Text style={styles.titleText}> {user.userName} 님</Text>
				<TouchableOpacity
					style={styles.titleSetting}
					onPress={myPageBtnListener}>
					{settingIcon}
				</TouchableOpacity>
			</View>
			<Notice />
			<TodayReservation />
			<MyReservation />
		</ScreenWrapper>
	);
}
