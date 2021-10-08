import isUndefined from 'lodash/isUndefined';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
	heightPercentage,
	widthPercentage,
	fontPercentage,
	color,
	ICTAButton,
	IReservationGettingDataByDay,
	IModalValue,
} from '../../../../../utils';
import { Modal, LoadingPage } from '../../../../layout';
import {
	heightGenerator,
	colorGenerator,
	yPosGenerator,
	xPosGenerator,
	times,
	week,
	convertReservationDataFormat,
} from './time-table.data';

const styles = StyleSheet.create({
	timeTable: {
		width: widthPercentage(336),
	},
	dayColumns: {
		height: heightPercentage(20),
		flexDirection: 'row',
	},
	cornerBox: {
		width: widthPercentage(14),
		borderWidth: 1,
		borderColor: '#cdcdcd',
		backgroundColor: color.mainColor,
	},
	day: {
		width: widthPercentage(46),
		alignItems: 'center',
		borderLeftWidth: 0,
		borderWidth: 1,
		borderColor: '#cdcdcd',
		backgroundColor: color.mainColor,
	},
	dayText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(10),
		includeFontPadding: false,
		color: 'white',
	},
	timeIndex: {
		flexDirection: 'row',
	},
	time: {
		width: widthPercentage(14),
		height: heightPercentage(46),
		alignItems: 'flex-end',
		borderTopWidth: 0,
		borderWidth: 1,
		borderColor: '#cdcdcd',
	},
	timeText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(10),
		includeFontPadding: false,
	},
	blankBox: {
		width: widthPercentage(46),
		height: heightPercentage(46),
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#cdcdcd',
	},
	reserveBox: {
		position: 'absolute',
		width: widthPercentage(46),
		alignItems: 'center',
		justifyContent: 'center',
	},
	reserveTitle: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: fontPercentage(9),
	},
	reserveText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(9),
	},
});

type ITimeTableProps = {
	reservationData: IReservationGettingDataByDay;
	isLoading: boolean;
};

export function TimeTable({ isLoading, reservationData }: ITimeTableProps) {
	const [modalValue, setModalValue] = useState<
		IModalValue & { title: string; isMine: boolean }
	>({
		isVisible: false,
		isMine: false,
		title: '',
		text: '',
	});

	const schedule = [
		!isUndefined(reservationData.MON)
			? [
					...reservationData.MON.map((data) =>
						convertReservationDataFormat(data),
					),
			  ]
			: [],
		!isUndefined(reservationData.TUE)
			? [
					...reservationData.TUE.map((data) =>
						convertReservationDataFormat(data),
					),
			  ]
			: [],
		!isUndefined(reservationData.WEN)
			? [
					...reservationData?.WEN.map((data) =>
						convertReservationDataFormat(data),
					),
			  ]
			: [],
		!isUndefined(reservationData.THUR)
			? [
					...reservationData.THUR.map((data) =>
						convertReservationDataFormat(data),
					),
			  ]
			: [],
		!isUndefined(reservationData.FRI)
			? [
					...reservationData.FRI.map((data) =>
						convertReservationDataFormat(data),
					),
			  ]
			: [],
		!isUndefined(reservationData.SAT)
			? [
					...reservationData.SAT.map((data) =>
						convertReservationDataFormat(data),
					),
			  ]
			: [],
		!isUndefined(reservationData.SUN)
			? [
					...reservationData.SUN.map((data) =>
						convertReservationDataFormat(data),
					),
			  ]
			: [],
	];

	const handleModalVisible = (title: string, text: string, isMine: boolean) =>
		setModalValue({
			isVisible: true,
			text,
			title,
			isMine,
		});

	const handleModalInVisible = () => {
		setModalValue((prev) => ({
			...prev,
			isVisible: false,
		}));
	};

	const renderModalButtons = (): Array<ICTAButton> => {
		const confirmButton: ICTAButton = {
			buttonText: '확인',
			buttonClickListener: handleModalInVisible,
		};

		const deleteButton: ICTAButton = {
			buttonText: '삭제',
			buttonClickListener: () => console.log('삭제하자!'),
		};

		if (modalValue.isMine) {
			return [confirmButton, deleteButton];
		}
		return [confirmButton];
	};

	if (isLoading)
		return (
			<View
				style={{ width: widthPercentage(340), height: heightPercentage(600) }}>
				<LoadingPage />
			</View>
		);
	return (
		<View style={styles.timeTable}>
			<Modal
				mdVisible={modalValue.isVisible}
				title={modalValue.title}
				subtitle={modalValue.text}
				buttonList={renderModalButtons()}
			/>
			<View style={styles.dayColumns}>
				<View style={styles.cornerBox} />
				{week.map((day) => (
					<View key={day} style={styles.day}>
						<Text style={styles.dayText}>{day}</Text>
					</View>
				))}
			</View>
			{times.map((time) => (
				<View key={time} style={styles.timeIndex}>
					<View style={styles.time}>
						<Text style={styles.timeText}>{time}</Text>
					</View>
					{week.map((index) => (
						<View key={index} style={styles.blankBox} />
					))}
				</View>
			))}
			{schedule.map((day, i) =>
				day.map((reserve, k) => (
					<TouchableOpacity
						key={reserve.startTime}
						onPress={() =>
							handleModalVisible(reserve.name, reserve.session1, reserve.isMine)
						}
						style={[
							styles.reserveBox,
							{
								height: heightGenerator(reserve.startTime, reserve.endTime),
								backgroundColor: colorGenerator(i * 10 + k),
								top: yPosGenerator(reserve.startTime),
								left: xPosGenerator(i),
							},
						]}>
						<Text style={styles.reserveTitle}>{reserve.name}</Text>
						<Text style={styles.reserveText}>{reserve.session1}</Text>
					</TouchableOpacity>
				)),
			)}
		</View>
	);
}
