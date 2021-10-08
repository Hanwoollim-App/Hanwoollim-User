import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	NavigationProp,
	ParamListBase,
	useFocusEffect,
	useNavigation,
} from '@react-navigation/native';
import {
	fontPercentage,
	trimmingText,
	blockStyles,
	IGetReservationData,
	getReservation,
	weekItems,
	EDay,
	IReservationGivenDataByDay,
} from '../../../../utils';
import isUndefined from 'lodash/isUndefined';
import { ItemType } from 'react-native-dropdown-picker';

const styles = StyleSheet.create({
	reservation: {
		flex: 1,
		width: '100%',
	},
	reservationText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
		lineHeight: fontPercentage(23),
		fontWeight: 'normal',
		fontStyle: 'normal',
		letterSpacing: 0,
		textAlign: 'left',
		color: '#494949',
	},
	noReservation: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
		lineHeight: fontPercentage(23),
		letterSpacing: 0,
		fontWeight: 'normal',
		fontStyle: 'normal',
		textAlign: 'center',
		color: '#494949',
	},
});

const dayMappingEMap = {
	0: EDay.SUN,
	1: EDay.MON,
	2: EDay.TUE,
	3: EDay.WEN,
	4: EDay.THUR,
	5: EDay.FRI,
	6: EDay.SAT,
};

const convertCurrentDayReservationData = (data: IGetReservationData) => {
	const currentDay = dayMappingEMap[new Date().getDay()];
	const currentDayData = data[0]?.[currentDay];

	return currentDayData;
};

export function TodayReservation() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();
	const currentWeekDate = weekItems[0].value as string;
	const [todayReservationData, setTodayReservationData] = useState<
		IReservationGivenDataByDay[]
	>([]);

	const tempReservation: Array<string> = [
		'03:00-04:00 안재훈 팀 합주',
		'13:00-14:00 한인권 개인 연습 (드럼) , 이원기 개인 연습(보컬), 조성현 개인 연습(기타)',
		'15:00-16:00 이호직 개인 연습 (보컬)',
	];

	useFocusEffect(
		useCallback(() => {
			(async () => {
				const { data } = await getReservation(currentWeekDate);

				setTodayReservationData(convertCurrentDayReservationData(data));
			})();
		}, [setTodayReservationData]),
	);
	const isEmpty: boolean =
		isUndefined(todayReservationData) || todayReservationData.length === 0;

	const titleBtnListener: () => void = () => {
		navigation.navigate('ReservingTimeTable');
	};

	return (
		<View style={blockStyles.root}>
			<View style={blockStyles.title}>
				<Text style={blockStyles.titleText}>오늘의 연습실 예약 현황</Text>
				<TouchableOpacity
					onPress={titleBtnListener}
					style={blockStyles.titleBtn}>
					<FontAwesomeIcon
						size={fontPercentage(20)}
						style={{
							color: '#000000',
						}}
						icon={faChevronRight}
					/>
				</TouchableOpacity>
			</View>
			<View style={blockStyles.contents}>
				{isEmpty ? (
					<Text style={styles.noReservation}>오늘 예약된 시간이 없습니다</Text>
				) : (
					<>
						{tempReservation.map((value) => (
							<View style={styles.reservation} key={value}>
								<Text style={styles.reservationText}>
									{trimmingText(value, 35)}
								</Text>
							</View>
						))}
						{todayReservationData.length > 3 && (
							<Text style={styles.reservationText}>
								{`외 ${todayReservationData.length - 3}개의 예약이 있습니다.`}
							</Text>
						)}
					</>
				)}
			</View>
		</View>
	);
}
