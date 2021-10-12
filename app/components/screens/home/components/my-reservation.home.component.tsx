import React from 'react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import isUndefined from 'lodash/isUndefined';
import { Divider } from 'react-native-paper';
import {
	fontPercentage,
	trimmingText,
	blockStyles,
	IReservationGivenDataByDay,
} from '../../../../utils';
import { LoadingPage } from '../../../layout';
import { convertReservationDataToDescription } from '../home.data';

const styles = StyleSheet.create({
	contents: {
		flex: 2,
	},
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
		lineHeight: fontPercentage(16),
		letterSpacing: 0,
		fontWeight: 'normal',
		fontStyle: 'normal',
		textAlign: 'center',
		color: '#494949',
	},
});

type IMyReservation = {
	todayReservationData: IReservationGivenDataByDay[];
	isLoading: boolean;
};

export function MyReservation({
	todayReservationData,
	isLoading,
}: IMyReservation) {
	const navigation: NavigationProp<ParamListBase> = useNavigation();
	const myReservation = todayReservationData?.filter((data) => data.isMine);

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
					{myReservation.slice(0, 3).map((value) => (
						<>
							<View style={styles.reservation} key={value.startTime}>
								<Text style={styles.reservationText}>
									{trimmingText(convertReservationDataToDescription(value), 35)}
								</Text>
							</View>
							<Divider />
						</>
					))}
					{myReservation.length > 3 && (
						<Text style={styles.reservationText}>
							{`외 ${myReservation.length - 3}개의 예약이 있습니다.`}
						</Text>
					)}
				</>
			)}
		</View>
	);

	return (
		<TouchableOpacity style={blockStyles.root} onPress={titleBtnListener}>
			<View style={blockStyles.title}>
				<Text style={blockStyles.titleText}>나의 연습실 예약 현황</Text>
				<View style={blockStyles.titleBtn}>
					<FontAwesomeIcon
						size={fontPercentage(20)}
						style={{
							color: '#000000',
						}}
						icon={faChevronRight}
					/>
				</View>
			</View>
			{isLoading ? <LoadingPage /> : renderContent()}
		</TouchableOpacity>
	);
}
