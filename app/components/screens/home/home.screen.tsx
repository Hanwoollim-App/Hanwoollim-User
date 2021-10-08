import React, { useCallback, useContext, useState } from 'react';
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
	useFocusEffect,
	useNavigation,
} from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAndroidBackHandler } from 'react-navigation-backhandler';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useAsyncCallback } from 'react-async-hook';
import {
	fontPercentage,
	getReservation,
	heightPercentage,
	IReservationGivenDataByDay,
	UserInfoContext,
	widthPercentage,
} from '../../../utils';
import { ScreenWrapper } from '../../layout';
import { Notice, TodayReservation, MyReservation } from './components';
import { currentWeekDate, convertCurrentDayReservationData } from './home.data';

const styles = StyleSheet.create({
	title: {
		height: heightPercentage(65),
		paddingHorizontal: widthPercentage(10),
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
	contents: {
		width: '100%',
		paddingHorizontal: widthPercentage(10),
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
	const [todayReservationData, setTodayReservationData] = useState<
		IReservationGivenDataByDay[]
	>([]);

	useAndroidBackHandler(() => {
		BackHandler.exitApp();
		return true;
	});
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const myPageBtnListener = () => {
		navigation.navigate('MyPage');
	};
	const { user } = useContext(UserInfoContext);

	const {
		execute: handleGettingTodayReservation,
		loading: isGettingTodayReservation,
	} = useAsyncCallback(async () => {
		const { data } = await getReservation(currentWeekDate);

		setTodayReservationData(convertCurrentDayReservationData(data));
	});

	useFocusEffect(
		useCallback(() => {
			(async () => handleGettingTodayReservation())();
		}, [setTodayReservationData]),
	);

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
			<View style={styles.contents}>
				<Notice />
				<TodayReservation
					todayReservationData={todayReservationData}
					isLoading={isGettingTodayReservation}
				/>
				<MyReservation
					todayReservationData={todayReservationData}
					isLoading={isGettingTodayReservation}
				/>
			</View>
		</ScreenWrapper>
	);
}
