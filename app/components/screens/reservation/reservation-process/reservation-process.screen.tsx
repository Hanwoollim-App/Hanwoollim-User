import React, { useState, Fragment } from 'react';
import { View, StyleSheet, Text, Platform, ScrollView } from 'react-native';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { CustomBtn, CustomModal, ScreenWrapper } from '../../../layout';
import {
	dayItems,
	PROCESS_TEXT,
	sectionItems,
	timeItems,
	unitItems,
	times,
	fontPercentage,
	heightPercentage,
	widthPercentage,
	customBtnType,
	ItemType,
	ValueType,
	color,
	postReservation,
} from '../../../../utils';

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

export function ReservationProcess({ route }) {
	const navigation: NavigationProp<ParamListBase> = useNavigation();
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const returnToMain = () => {
		navigation.navigate('ReservationTimeTable');
	};
	const modalBtn: Array<customBtnType> = [
		{
			buttonText: '확인',
			buttonClickListener: returnToMain,
		},
	];

	const currentWeek: string = route.params.weekName.label;
	const startDate: string = route.params.startDate;

	const [day, setDay] = useState<ValueType>('');
	const [dayOpen, setDayOpen] = useState<boolean>(false);
	const [dayItem, setDayItems] = useState<Array<ItemType>>(dayItems);

	const [unit, setUnit] = useState<ValueType>('');
	const [unitOpen, setUnitOpen] = useState<boolean>(false);
	const [unitItem, setUnitItems] = useState<Array<ItemType>>(unitItems);

	const [time, setTime] = useState<ValueType>('');
	const [timeOpen, setTimeOpen] = useState<boolean>(false);
	const [timeItem, setTimeItems] = useState<Array<ItemType>>(timeItems);

	const [section, setSection] = useState<ValueType[]>([]);
	const [sectionOpen, setSectionOpen] = useState<boolean>(false);
	const [sectionItem, setSectionItems] =
		useState<Array<ItemType>>(sectionItems);

	const [scrollTime, setscrollTime] = useState<Array<ItemType>>(times);

	const changeVisible = () => {
		setModalVisible(!modalVisible);
	};

	const handleReservation = async () => {
		try {
			if (day === 'MON') {
				await postReservation({
					startDate,
					reservationType: 'Personal',
					MON: {
						startTime: time as number,
						endTime: (time as number) + 1,
						session1: section[0] as string,
					},
				});
				return;
			}
			if (day === 'TUE') {
				await postReservation({
					startDate,
					reservationType: 'Personal',
					TUE: {
						startTime: time as number,
						endTime: (time as number) + 1,
						session1: section[0] as string,
					},
				});

				return;
			}
			await postReservation({
				startDate,
				reservationType: 'Personal',
				MON: {
					startTime: time as number,
					endTime: (time as number) + 1,
					session1: section[0] as string,
				},
			});
		} catch (err) {
			console.log(err.response);
		}

		changeVisible();
	};

	return (
		<ScreenWrapper headerTitle="예약하기">
			<CustomModal
				mdVisible={modalVisible}
				title={'예약이 완료되었습니다!'}
				buttonList={modalBtn}
			/>
			<View style={styles.bodyContainer}>
				<View style={styles.row}>
					<View>
						<DropDownPicker
							open={dayOpen}
							value={day}
							items={dayItem}
							setOpen={setDayOpen}
							setValue={setDay}
							setItems={setDayItems}
							style={styles.dropDown}
							textStyle={styles.dropDownText}
							dropDownContainerStyle={styles.dropDownContainer}
							placeholderStyle={styles.dropDownPlaceHolder}
							placeholder="요일"
							zIndex={10000}
						/>
					</View>
					<Text style={styles.date}>{`${currentWeek}`}</Text>
				</View>

				<View style={styles.contentContainer}>
					<View style={styles.timeBox}>
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
					</View>
					<View style={styles.UnitPicker}>
						<DropDownPicker
							open={unitOpen}
							value={unit}
							items={unitItem}
							setOpen={setUnitOpen}
							setValue={setUnit}
							setItems={setUnitItems}
							style={styles.dropDown2}
							textStyle={styles.dropDownText}
							dropDownContainerStyle={styles.dropDownContainer}
							placeholderStyle={styles.dropDownPlaceHolder}
							placeholder={PROCESS_TEXT.UNIT}
							zIndex={9000}
						/>
					</View>
					<View style={styles.reservationTimePicker}>
						<DropDownPicker
							open={timeOpen}
							value={time}
							items={timeItem}
							setOpen={setTimeOpen}
							setValue={setTime}
							setItems={setTimeItems}
							style={styles.dropDown2}
							textStyle={styles.dropDownText}
							dropDownContainerStyle={styles.dropDownContainer}
							placeholderStyle={styles.dropDownPlaceHolder}
							placeholder={PROCESS_TEXT.TIME}
							zIndex={8000}
						/>
					</View>
					<Text style={styles.sectionInfo__alert__text}>
						{PROCESS_TEXT.ALERT}
					</Text>
					<View style={styles.sectionInfo__form}>
						<DropDownPicker
							multiple={true}
							min={0}
							max={3}
							open={sectionOpen}
							value={section}
							items={sectionItem}
							setOpen={setSectionOpen}
							setValue={setSection}
							setItems={setSectionItems}
							style={styles.dropDown2}
							textStyle={styles.dropDownText}
							dropDownContainerStyle={styles.dropDownContainer}
							placeholderStyle={styles.dropDownPlaceHolder}
							placeholder={PROCESS_TEXT.SECTION}
							zIndex={7000}
						/>
					</View>
					<View style={styles.submit}>
						<CustomBtn
							title={PROCESS_TEXT.SUBMIT}
							btnStyle={styles.submit__btn}
							titleStyle={styles.submit__text}
							onClickListener={handleReservation}
						/>
					</View>
				</View>
			</View>
		</ScreenWrapper>
	);
}
