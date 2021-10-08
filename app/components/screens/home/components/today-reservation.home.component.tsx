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
} from '../../../../utils';
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

export function TodayReservation() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();
	const [startDates, setStartDates] = useState<Array<ItemType>>(weekItems);
	// const [targetDateValue, setTargetDateValue] = useState<string | null>(null);
	const [reservationData, setReservationData] = useState(null);

	const today = new Date();
	const todayWeek = today.getDay();

	console.log(todayWeek);
	const weekValue = startDates[1].value;
	// const findStartDate = () =>
	// 	startDates.filter((startDate) => startDate.value === targetDateValue)[0]
	// 		.value;
	// const targetStartDate = findStartDate();

	const tempReservation: Array<string> = [
		'03:00-04:00 안재훈 팀 합주',
		'13:00-14:00 한인권 개인 연습 (드럼) , 이원기 개인 연습(보컬), 조성현 개인 연습(기타)',
		'15:00-16:00 이호직 개인 연습 (보컬)',
	];

	useFocusEffect(
		useCallback(() => {
			(async () => {
				const { data } = await getReservation(weekValue as string);

				setReservationData(data);
			})();
		}, []),
	);
	console.log(reservationData);

	const isEmpty: boolean = tempReservation.length === 0;

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
				{(isEmpty && (
					<Text style={styles.noReservation}>오늘 예약된 시간이 없습니다</Text>
				)) ||
					tempReservation.map((value) => (
						<View style={styles.reservation} key={value}>
							<Text style={styles.reservationText}>
								{trimmingText(value, 35)}
							</Text>
						</View>
					))}
				<Text style={styles.reservationText}>외 3개의 예약이 있습니다.</Text>
			</View>
		</View>
	);
}
