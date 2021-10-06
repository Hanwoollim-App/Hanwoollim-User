import React, { useCallback, useEffect, useState } from 'react';
import {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	ScrollView,
	Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import isNull from 'lodash/isNull';
import {
	NavigationProp,
	ParamListBase,
	useFocusEffect,
	useNavigation,
} from '@react-navigation/native';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
	ItemType,
	ValueType,
	weekItems,
	getReservation,
} from '../../../../utils';
import { LoadingPage, ScreenWrapper } from '../../../layout';
import { TimeTable } from './components';
import { useAsyncCallback } from 'react-async-hook';

const styles = StyleSheet.create({
	titleBlock: {
		width: '95%',
		alignItems: 'center',
		height: heightPercentage(66),
	},
	row: {
		width: '95%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: heightPercentage(66),
		...Platform.select({
			ios: {
				zIndex: 1000,
			},
			android: {},
		}),
	},
	picker: {
		width: widthPercentage(162),
		height: heightPercentage(36),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	reserveBtn: {
		width: widthPercentage(146),
		height: heightPercentage(36),
		borderRadius: widthPercentage(15),
		borderWidth: widthPercentage(1),
		backgroundColor: '#ffffff',
		borderStyle: 'solid',
		borderColor: '#00203f',
		alignItems: 'center',
		justifyContent: 'center',
	},
	reserveBtnText: {
		height: heightPercentage(20),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(14),
		fontWeight: 'bold',
		fontStyle: 'normal',
		letterSpacing: 0,
		textAlign: 'center',
		color: '#00203f',
	},
	dropDown: {
		width: widthPercentage(162),
		height: heightPercentage(36),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
	},
	dropDownText: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 16,
		fontWeight: 'bold',
	},
	dropDownContainer: {
		borderRadius: widthPercentage(10),
		minHeight: heightPercentage(50),
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
	},
	placeholder: { color: 'grey' },
});

export function ReservationTimeTable() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const [open, setOpen] = useState<boolean>(false);
	const [targetDateValue, setTargetDateValue] = useState<ValueType>(null);
	const [startDates, setStartDates] = useState<Array<ItemType>>(weekItems);
	const [reservationData, setReservationData] = useState(null);

	const findStartDate = () =>
		startDates.filter((startDate) => startDate.value === targetDateValue)[0]
			.value;

	const reserveBtnListener = () => {
		if (isNull(targetDateValue)) {
			return;
		}
		const weekName = weekItems.filter(
			(item) => item.value === targetDateValue,
		)[0];

		const targetStartDate = findStartDate();

		navigation.navigate('ReservationProcess', {
			weekName,
			startDate: targetStartDate,
		});
	};

	const {
		execute: handleUpdateReservationData,
		loading: isUpdatingReservationData,
	} = useAsyncCallback(async () => {
		if (isNull(targetDateValue)) {
			return;
		}
		const targetStartDate = findStartDate();

		try {
			const { data } = await getReservation(targetStartDate as string);

			console.log(data);

			setReservationData(data[0]);
		} catch (err) {
			console.log(err.response);
		}
	});

	useEffect(() => {
		(async () => handleUpdateReservationData())();
	}, [targetDateValue]);

	useFocusEffect(
		useCallback(() => {
			(async () => handleUpdateReservationData())();
		}, []),
	);

	return (
		<ScreenWrapper headerTitle="예약하기">
			<View style={styles.row}>
				<View>
					<DropDownPicker
						open={open}
						value={targetDateValue}
						items={startDates}
						setOpen={setOpen}
						setValue={setTargetDateValue}
						setItems={setStartDates}
						style={styles.dropDown}
						textStyle={styles.dropDownText}
						dropDownContainerStyle={styles.dropDownContainer}
						placeholderStyle={styles.placeholder}
					/>
				</View>
				<TouchableOpacity
					style={styles.reserveBtn}
					onPress={reserveBtnListener}>
					<Text style={styles.reserveBtnText}>예약하기</Text>
				</TouchableOpacity>
			</View>
			<ScrollView>
				{targetDateValue && reservationData && (
					<TimeTable
						isLoading={isUpdatingReservationData}
						reservationData={reservationData}
					/>
				)}
			</ScrollView>
		</ScreenWrapper>
	);
}
