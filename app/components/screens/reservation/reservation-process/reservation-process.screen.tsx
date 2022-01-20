import React, { useState, Fragment } from 'react';
import { View, StyleSheet, Text, Platform, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { useAsyncCallback } from 'react-async-hook';
import { StackNavigationProp } from '@react-navigation/stack';
import { CTAButton, Modal, ScreenWrapper } from '../../../layout';
import {
	dayItems,
	PROCESS_TEXT,
	sessionItems,
	timeItems,
	unitItems,
	fontPercentage,
	heightPercentage,
	widthPercentage,
	ICTAButton,
	color,
	postReservation,
	EDay,
	IModalValue,
} from '../../../../utils';
import { IReservationNavigatorParamList } from '../../../navigator';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, RESERVATION_SCHEMA } from './reservation-process.data';
import { IReservationFormData } from './reservation-process.type';

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	bodyContainer: {
		width: widthPercentage(335),
		height: heightPercentage(760),
		marginHorizontal: widthPercentage(20),
		marginTop: heightPercentage(20),
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		...Platform.select({
			ios: {
				zIndex: 100,
			},
			android: {},
		}),
	},
	dayPicker: {
		width: widthPercentage(154),
		height: heightPercentage(36),
		borderColor: color.mainColor,
	},
	UnitPicker: {
		width: '100%',
		height: heightPercentage(46),
		marginTop: heightPercentage(20),
		...Platform.select({
			ios: {
				zIndex: 90,
			},
			android: {},
		}),
	},
	reservationTimePicker: {
		width: '100%',
		height: heightPercentage(46),
		marginTop: heightPercentage(20),
		...Platform.select({
			ios: {
				zIndex: 80,
			},
			android: {},
		}),
	},
	contentContainer: {
		alignItems: 'center',
	},
	timeBox: {
		width: '100%',
		height: heightPercentage(41),
		marginTop: heightPercentage(17),
		borderRadius: fontPercentage(12),
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
		...Platform.select({
			ios: {
				zIndex: 10,
			},
			android: {},
		}),
	},
	sectionInfo__form: {
		flexDirection: 'row',
		marginTop: heightPercentage(20),
		...Platform.select({
			ios: {
				zIndex: 50,
			},
			android: {},
		}),
	},
	sectionInfo__alert__text: {
		marginTop: heightPercentage(8),
		marginLeft: widthPercentage(-170),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(8),
		letterSpacing: 0,
		textAlign: 'left',
		color: '#363636',
	},
	submit: {
		position: 'absolute',
		width: widthPercentage(290),
		height: heightPercentage(53),
		marginTop: heightPercentage(500),
		borderRadius: fontPercentage(21),
		backgroundColor: color.mainColor,
	},
	submit__btn: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	submit__text: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: fontPercentage(20),
		textAlign: 'center',
		color: '#ffffff',
	},
	dropDown: {
		width: widthPercentage(154),
		height: heightPercentage(36),
		paddingVertical: 0,
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
	},
	dropDown2: {
		width: widthPercentage(335),
		height: heightPercentage(46),
		paddingVertical: 0,
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
	},
	dropDownText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 16,
		fontWeight: 'bold',
	},
	dropDownContainer: {
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
	},
	dropDownPlaceHolder: {
		color: '#a2a2a2',
	},
	date: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(14),
		textAlign: 'right',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: heightPercentage(6),
		color: '#000000',
	},
	scrollTime: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(9),
		color: '#6d6d6d',
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
	},
	scrollTimeBox: {
		width: widthPercentage(19),
		height: heightPercentage(11),
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#707070',
		marginTop: heightPercentage(3),
		marginLeft: widthPercentage(3),
	},
	alignCenter: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

type IReservationNavigationProp = StackNavigationProp<
	IReservationNavigatorParamList,
	'ReservationProcess'
>;

type IReservationProcessRouteProp = RouteProp<
	IReservationNavigatorParamList,
	'ReservationProcess'
>;

type IReservationProcessProp = {
	navigation: IReservationNavigationProp;
	route: IReservationProcessRouteProp;
};

export function ReservationProcess({
	navigation,
	route,
}: IReservationProcessProp) {
	const [modalValue, setModalValue] = useState<IModalValue>({
		isVisible: false,
		text: '',
	});

	const { formState, control, handleSubmit } = useForm({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(RESERVATION_SCHEMA),
	});

	const { isDirty, isSubmitSuccessful, isSubmitting, isValid } = formState;

	const [dayOpen, setDayOpen] = useState<boolean>(false);
	const [dayItem, setDayItems] = useState<Array<ItemType>>(dayItems);

	const [unitOpen, setUnitOpen] = useState<boolean>(false);
	const [unitItem, setUnitItems] = useState<Array<ItemType>>(unitItems);

	const [timeOpen, setTimeOpen] = useState<boolean>(false);
	const [timeItem, setTimeItems] = useState<Array<ItemType>>(timeItems);

	const [sessionOpen, setSessionOpen] = useState<boolean>(false);
	const [sessionItem, setSessionItems] =
		useState<Array<ItemType>>(sessionItems);
	const [isErrorOccurring, setIsErrorOccurring] = useState(false);

	const handleModalButton = () => {
		setModalValue({
			isVisible: false,
			text: '',
		});
		if (!isErrorOccurring) {
			navigation.pop();
		}
	};

	const openModal = (successText: string) =>
		setModalValue({
			isVisible: true,
			text: successText,
		});

	const successModalBtn: Array<ICTAButton> = [
		{
			buttonText: '확인',
			buttonClickListener: handleModalButton,
		},
	];

	const currentWeek = route.params.weekName.label;
	const startDate = route.params.startDate;

	const { execute: handleAddingReservation, loading: isAddingReservation } =
		useAsyncCallback(async (day, unit, time, session) => {
			try {
				await postReservation({
					startDate,
					reservationType: 'Personal',
					[EDay[day]]: {
						day,
						startTime: parseInt(time, 10),
						endTime: parseInt(time, 10) + 1,
						session1: session as string,
					},
				});
				openModal('예약되었습니다!');
			} catch (err) {
				setIsErrorOccurring(true);
				if (err.response.status === 400) {
					openModal('예약하려는 시간에 이미 예약이 있습니다.');
				}
			}
		});

	const handlePressAddingReservation = async (data: IReservationFormData) => {
		await handleAddingReservation(data.day, data.unit, data.time, data.session);
	};

	return (
		<ScreenWrapper headerTitle="예약하기">
			<Modal
				isLoading={isAddingReservation}
				mdVisible={modalValue.isVisible}
				title={modalValue.text}
				buttonList={successModalBtn}
			/>
			<View style={styles.bodyContainer}>
				<View style={styles.row}>
					<View>
						<Controller
							control={control}
							name="day"
							render={({ field: { onChange, value: currentDay } }) => {
								return (
									<DropDownPicker
										open={dayOpen}
										value={currentDay}
										items={dayItem}
										setOpen={setDayOpen}
										setValue={onChange}
										setItems={setDayItems}
										onChangeValue={onChange}
										style={styles.dropDown}
										textStyle={styles.dropDownText}
										dropDownContainerStyle={styles.dropDownContainer}
										placeholderStyle={styles.dropDownPlaceHolder}
										placeholder="요일"
										zIndex={10000}
									/>
								);
							}}
						/>
					</View>
					<Text style={styles.date}>{`${currentWeek}`}</Text>
				</View>

				<View style={styles.contentContainer}>
					{/* <View style={styles.timeBox}>
						<ScrollView horizontal={true}>
							<View style={styles.alignCenter}>
								{scrollTime.map((item) => {
									return (
										<Fragment key={item.value as string}>
											<View>
												<Text style={styles.scrollTime}>{item.label}</Text>
												<View style={styles.scrollTimeBox}></View>
											</View>
											<View>
												<Text style={styles.scrollTime}> </Text>
												<View style={styles.scrollTimeBox}></View>
											</View>
										</Fragment>
									);
								})}
							</View>
						</ScrollView>
					</View> */}
					<View style={styles.UnitPicker}>
						<Controller
							control={control}
							name="unit"
							render={({ field: { onChange, value: currentUnit } }) => {
								return (
									<DropDownPicker
										open={unitOpen}
										value={currentUnit}
										items={unitItem}
										setOpen={setUnitOpen}
										setValue={onChange}
										onChangeValue={onChange}
										setItems={setUnitItems}
										style={styles.dropDown2}
										textStyle={styles.dropDownText}
										dropDownContainerStyle={styles.dropDownContainer}
										placeholderStyle={styles.dropDownPlaceHolder}
										placeholder={PROCESS_TEXT.UNIT}
										zIndex={9000}
									/>
								);
							}}
						/>
					</View>
					<View style={styles.reservationTimePicker}>
						<Controller
							control={control}
							name="time"
							render={({ field: { onChange, value: currentTime } }) => {
								return (
									<DropDownPicker
										open={timeOpen}
										value={currentTime}
										items={timeItem}
										setOpen={setTimeOpen}
										setValue={onChange}
										setItems={setTimeItems}
										onChangeValue={onChange}
										style={styles.dropDown2}
										textStyle={styles.dropDownText}
										dropDownContainerStyle={styles.dropDownContainer}
										placeholderStyle={styles.dropDownPlaceHolder}
										placeholder={PROCESS_TEXT.TIME}
										zIndex={8000}
									/>
								);
							}}
						/>
					</View>
					<Text style={styles.sectionInfo__alert__text}>
						{PROCESS_TEXT.ALERT}
					</Text>
					<View style={styles.sectionInfo__form}>
						<Controller
							control={control}
							name="session"
							render={({ field: { onChange, value: currentSession } }) => {
								return (
									<DropDownPicker
										open={sessionOpen}
										value={currentSession}
										items={sessionItem}
										setOpen={setSessionOpen}
										setValue={onChange}
										setItems={setSessionItems}
										onChangeValue={onChange}
										style={styles.dropDown2}
										textStyle={styles.dropDownText}
										dropDownContainerStyle={styles.dropDownContainer}
										placeholderStyle={styles.dropDownPlaceHolder}
										placeholder={PROCESS_TEXT.SECTION}
										zIndex={7000}
									/>
								);
							}}
						/>
					</View>
					<View style={styles.submit}>
						<CTAButton
							title={PROCESS_TEXT.SUBMIT}
							btnStyle={styles.submit__btn}
							titleStyle={styles.submit__text}
							onClickListener={handleSubmit(handlePressAddingReservation)}
							disabled={!isValid}
						/>
					</View>
				</View>
			</View>
		</ScreenWrapper>
	);
}
