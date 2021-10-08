import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import {
	fontPercentage,
	trimmingText,
	blockStyles,
	EDay,
	IReservationGivenDataByDay,
} from '../../../../utils';
import isUndefined from 'lodash/isUndefined';
import { LoadingPage } from '../../../layout';
import { convertNumTimeToStringTime } from '../../reservation/reservation-time-table/components/time-table.data';

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

const convertReservationDataToDescription = (
	data: IReservationGivenDataByDay,
) => {
	const startTime = convertNumTimeToStringTime(data.startTime);
	const endTime = convertNumTimeToStringTime(data.endTime);

	return `${startTime}-${endTime} ${data.name} (${data.session1})`;
};

type ITodayReservation = {
	todayReservationData: IReservationGivenDataByDay[];
	isLoading: boolean;
};

export function TodayReservation({
	todayReservationData,
	isLoading,
}: ITodayReservation) {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const isEmpty: boolean =
		isUndefined(todayReservationData) || todayReservationData.length === 0;

	const titleBtnListener: () => void = () => {
		navigation.navigate('ReservingTimeTable');
	};

	const renderContent = () => (
		<View style={blockStyles.contents}>
			{isEmpty ? (
				<Text style={styles.noReservation}>오늘 예약된 시간이 없습니다</Text>
			) : (
				<>
					{todayReservationData.slice(0, 3).map((value) => (
						<View style={styles.reservation} key={value.startTime}>
							<Text style={styles.reservationText}>
								{trimmingText(convertReservationDataToDescription(value), 35)}
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
	);

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
			{isLoading ? <LoadingPage /> : renderContent()}
		</View>
	);
}
