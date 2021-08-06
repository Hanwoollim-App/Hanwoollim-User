import React, { useState } from 'react';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet, Text } from 'react-native';
import CustomBtn from '../../../common/CustomBtn';
import color from '../../../../utils/constant/common/design/Color';
import {
	dayItems,
	PROCESS_TEXT,
	sectionItems,
	timeItems,
	unitItems,
} from '../../../../utils/constant/reservation/process/reservationProcess';
import CustomModal from '../../../common/CustomModal';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../../utils/constant/common/design/Responsive';
import ScreenWrapper from '../../../common/ScreenWrapper';
import { customBtnType } from '../../../../utils/types/customModal';

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
		zIndex: 100,
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
		zIndex: 90,
	},
	reservationTimePicker: {
		width: '100%',
		height: heightPercentage(46),
		marginTop: heightPercentage(20),
		zIndex: 80,
	},
	contentContainer: {
		alignItems: 'center',
	},
	timeBox: {
		width: '100%',
		height: heightPercentage(41),
		marginTop: heightPercentage(17),
		borderRadius: fontPercentage(12),
		borderStyle: 'solid',
		borderWidth: fontPercentage(1),
		borderColor: '#bdbdbd',
		zIndex: 10,
	},
	defaultInfo: {
		width: '100%',
		marginTop: heightPercentage(15),
		paddingBottom: heightPercentage(26),
		borderRadius: fontPercentage(11),
		backgroundColor: 'white',
		borderStyle: 'solid',
		borderWidth: fontPercentage(1),
		borderColor: '#bdbdbd',
	},
	defaultInfo__form: {
		flexDirection: 'row',
		marginTop: heightPercentage(39),
	},
	sectionInfo: {
		width: '100%',
		marginTop: heightPercentage(13),
		paddingBottom: heightPercentage(25),
		borderRadius: fontPercentage(11),
		backgroundColor: '#ffffff',
		borderStyle: 'solid',
		borderWidth: fontPercentage(1),
		borderColor: '#bdbdbd',
	},
	sectionInfo__form: {
		flexDirection: 'row',
		marginTop: heightPercentage(20),
		zIndex: 50,
	},
	sectionInfo__alert__text: {
		marginTop: heightPercentage(8),
		marginLeft: widthPercentage(9),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(8),
		letterSpacing: 0,
		textAlign: 'left',
		color: '#363636',
	},
	sectionInfo__addBtn: {
		width: widthPercentage(130),
		height: heightPercentage(30),
		marginTop: heightPercentage(23),
		marginLeft: widthPercentage(174),
	},
	sectionInfo__addBtn__Text: {
		width: '100%',
		height: '100%',
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
		fontWeight: 'normal',
		fontStyle: 'normal',
		letterSpacing: 0,
		textAlign: 'left',
		color: color.mainColor,
	},
	submit: {
		position: 'absolute',
		width: widthPercentage(290),
		height: heightPercentage(53),
		marginTop: heightPercentage(300),
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
});

function ReservationProcess({ route }) {
	const navigation: NavigationProp<ParamListBase> = useNavigation();
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const changeVisible = () => {
		setModalVisible(!modalVisible);
	};

	const returnToMain = () => {
		navigation.navigate('ReservationTimeTable');
	};
	const modalBtn: Array<customBtnType> = [
		{
			buttonText: '확인',
			buttonClickListener: returnToMain,
		},
	];

	const [sectionInfoCount, setSectionInfoCount]: [number[], Function] =
		useState([1]);

	const currentWeek: any = route.params;

	const [day, setDay] = useState('');
	const [dayOpen, setDayOpen] = useState(false);
	const [dayItem, setDayItems] = useState(dayItems);

	const [unit, setUnit] = useState('');
	const [unitOpen, setUnitOpen] = useState(false);
	const [unitItem, setUnitItems] = useState(unitItems);

	const [time, setTime] = useState('');
	const [timeOpen, setTimeOpen] = useState(false);
	const [timeItem, setTimeItems] = useState(timeItems);

	const [section, setSection] = useState('');
	const [sectionOpen, setSectionOpen] = useState(false);
	const [sectionItem, setSectionItems] = useState(sectionItems);

	return (
		<ScreenWrapper headerTitle="예약하기">
			<CustomModal
				mdVisible={modalVisible}
				title={'예약이 완료되었습니다!'}
				buttonList={modalBtn}
			/>
			<View style={styles.bodyContainer}>
				<View style={styles.row}>
					<View style={styles.dayPicker}>
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
						/>
					</View>
					<Text style={styles.date}>{`${currentWeek}`}</Text>
				</View>

				<View style={styles.contentContainer}>
					<View style={styles.timeBox}>
						<Text> {`시간들이 들어갈 공간`}</Text>
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
						/>
					</View>
				</View>
				<Text style={styles.sectionInfo__alert__text}>
					{PROCESS_TEXT.ALERT}
				</Text>
				<View style={styles.contentContainer}>
					{sectionInfoCount.map((value) => (
						<View key={value} style={styles.sectionInfo__form}>
							<DropDownPicker
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
								placeholder={`${PROCESS_TEXT.SECTION} ${value}`}
							/>
						</View>
					))}
					<View style={styles.submit}>
						<CustomBtn
							title={PROCESS_TEXT.SUBMIT}
							btnStyle={styles.submit__btn}
							titleStyle={styles.submit__text}
							onClickListener={changeVisible}
						/>
					</View>
				</View>
			</View>
		</ScreenWrapper>
	);
}

export default ReservationProcess;
