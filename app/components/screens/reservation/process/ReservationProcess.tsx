import React, {useState} from "react";
import {View, StyleSheet, Text} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {useNavigation} from "@react-navigation/native";
import {responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import CustomBtn from "../../../common/CustomBtn";
import Header from "./Header";
import SelectForm from "./SelectForm";
import color from "../../../../utils/constant/common/design/Color";
import {dayItems, MODAL_TEXT, PROCESS_TEXT, sectionItems, timeItems, unitItems} from "../../../../utils/constant/reservation/process/ReservationProcessUtil";
import CustomModal from "../../../common/CustomModal";
import {fontPercentage, heightPercentage, widthPercentage} from "../../../../utils/constant/common/design/Responsive";

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontFamily: "KoreanYNSJG3",
		fontSize: RFPercentage(10),
		lineHeight: RFPercentage(16),
		letterSpacing: 0,
		textAlign: "left",
		color: "#000000",
	},
	inputAndroid: {
		width: "100%",
		height: "100%",
		paddingVertical: 2, // 이 변수가 있어야 텍스트가 박스 안쪽으로 들어옴
		fontSize: RFPercentage(fontPercentage(12)),
		fontFamily: "KoreanYNSJG3",
		lineHeight: RFPercentage(fontPercentage(12)),
		letterSpacing: 0,
		textAlign: "center",
		color: "#000000",
	},
});

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	headerContainer: {
		width: "100%",
		height: responsiveHeight(heightPercentage(57)),
		flexDirection: "row",
		alignItems: "center",
		borderBottomColor: "black",
		borderWidth: 1, // 임시로 구별하기 위해서 만들어놓았습니다. 작업이 다 끝나면 없앨 예정입니다.
	},
	bodyContainer: {
		width: responsiveWidth(widthPercentage(327)),
		height: responsiveHeight(heightPercentage(760)),
		marginHorizontal: responsiveWidth(widthPercentage(25)),
		marginTop: responsiveHeight(heightPercentage(29)),
	},
	dayPicker: {
		width: responsiveWidth(widthPercentage(113)),
		height: responsiveHeight(heightPercentage(26)),
		borderWidth: RFPercentage(fontPercentage(1)),
		borderColor: color.mainColor,
	},
	contentContainer: {
		alignItems: "center",
	},
	timeBox: {
		width: "100%",
		height: responsiveHeight(heightPercentage(41)),
		marginTop: responsiveHeight(heightPercentage(17)),
		borderRadius: RFPercentage(fontPercentage(12)),
		borderStyle: "solid",
		borderWidth: RFPercentage(fontPercentage(1)),
		borderColor: "#bdbdbd",
	},
	defaultInfo: {
		width: "100%",
		marginTop: responsiveHeight(heightPercentage(15)),
		paddingBottom: responsiveHeight(heightPercentage(26)),
		borderRadius: RFPercentage(fontPercentage(11)),
		backgroundColor: "white",
		borderStyle: "solid",
		borderWidth: RFPercentage(fontPercentage(1)),
		borderColor: "#bdbdbd",
	},
	defaultInfo__form: {
		flexDirection: "row",
		marginTop: responsiveHeight(heightPercentage(39)),
	},
	sectionInfo: {
		width: "100%",
		marginTop: responsiveHeight(heightPercentage(13)),
		paddingBottom: responsiveHeight(heightPercentage(25)),
		borderRadius: RFPercentage(fontPercentage(11)),
		backgroundColor: "#ffffff",
		borderStyle: "solid",
		borderWidth: RFPercentage(fontPercentage(1)),
		borderColor: "#bdbdbd",
	},
	sectionInfo__form: {
		flexDirection: "row",
		marginTop: responsiveHeight(heightPercentage(32)),
	},
	sectionInfo__alert__text: {
		marginTop: responsiveHeight(heightPercentage(8)),
		marginLeft: responsiveWidth(widthPercentage(140)),
		fontFamily: "KoreanYNSJG2",
		fontSize: RFPercentage(fontPercentage(8)),
		lineHeight: RFPercentage(fontPercentage(11)),
		letterSpacing: 0,
		textAlign: "left",
		color: "#363636",
	},
	sectionInfo__addBtn: {
		width: responsiveWidth(widthPercentage(130)),
		height: responsiveHeight(heightPercentage(30)),
		marginTop: responsiveHeight(heightPercentage(23)),
		marginLeft: responsiveWidth(widthPercentage(174)),
	},
	sectionInfo__addBtn__Text: {
		width: "100%",
		height: "100%",
		fontFamily: "KoreanYNSJG4",
		fontSize: RFPercentage(fontPercentage(12)),
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: RFPercentage(fontPercentage(16)),
		letterSpacing: 0,
		textAlign: "left",
		color: color.mainColor,
	},
	submit: {
		width: responsiveWidth(widthPercentage(290)),
		height: responsiveHeight(heightPercentage(42)),
		marginTop: responsiveHeight(heightPercentage(170)),
		borderRadius: RFPercentage(fontPercentage(21)),
		backgroundColor: color.mainColor,
	},
	submit__btn: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	sumbit__text: {
		fontFamily: "KoreanYNSJG4",
		fontSize: RFPercentage(fontPercentage(13)),
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: RFPercentage(fontPercentage(18)),
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
});


function ReservationProcess({route}) {
	const [modalVisible, setModalVisible]: [boolean, Function] = useState(false);
	const [sectionInfoCount, setSectionInfoCount]: [number[], Function] = useState([1]);
	const navigation = useNavigation();
	const {currentWeek}: any = route.params; // ts 형식으로 바꿀 필요 있음
	const onUnitChangeListener = (value) => {
		console.log(value);
	};
	const onTimeChangeListener = (value) => {
		console.log(value);
	};
	const onSectionChangeListener = (value) => {
		console.log(value);
	};
	const onSectionAddBtnClickListener = () => {
		const newItem: number = sectionInfoCount.length + 1;

		if (newItem === 3) return;
		setSectionInfoCount([
			...sectionInfoCount,
			newItem,
		]);
	};
	const onsumbitBtnClickListener = () => {
		setModalVisible(true);
	};


	return (
		<View style={styles.root}>
			<CustomModal
				mdVisible={modalVisible}
				title={MODAL_TEXT.TITLE}
				firstButton={() => {
					setModalVisible(false);
					navigation.navigate("BottomTabNavigator", {
						screen: "Home",
					});
				}}
				firstBtnTitle={MODAL_TEXT.BTN_TITLE}
			/>
			<View style={styles.headerContainer}>
				<Header
					currentWeek={currentWeek}
				/>
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.dayPicker}>
					<RNPickerSelect
						placeholder={{}}
						style={pickerSelectStyles}
						items={dayItems}
						value={dayItems[0]}
						onValueChange={(value) => console.log(value)}
					/>
				</View>
				<View style={styles.contentContainer}>
					<View style={styles.timeBox}>
						<Text> {`시간들이 들어갈 공간`}</Text>
					</View>
					<View style={styles.defaultInfo}>
						<View style={styles.defaultInfo__form}>
							<SelectForm
								title={PROCESS_TEXT.UNIT}
								pickerProps={{
									placeholder: {},
									pickerSelectStyles,
									items: unitItems,
									value: unitItems[0],
									onValueChange: onUnitChangeListener,
								}}
							/>
						</View>
						<View style={styles.defaultInfo__form}>
							<SelectForm
								title={PROCESS_TEXT.TIME}
								pickerProps={{
									placeholder: {},
									pickerSelectStyles,
									items: timeItems,
									value: timeItems[0],
									onValueChange: onTimeChangeListener,
								}}
							/>
						</View>
						<Text style={styles.sectionInfo__alert__text}>
							{PROCESS_TEXT.ALERT}
						</Text>
					</View>
					<View style={styles.sectionInfo}>
						{
							sectionInfoCount.map((value) => (
								<View
									key={value}
									style={styles.sectionInfo__form}
								>
									<SelectForm
										title={`${PROCESS_TEXT.SECTION} ${value}`}
										pickerProps={{
											placeholder: {},
											pickerSelectStyles,
											items: sectionItems,
											value: sectionItems[0],
											onValueChange: onSectionChangeListener,
										}}
									/>
								</View>
							))
						}
						<CustomBtn
							title={PROCESS_TEXT.SECTION_ADD}
							onClickListener={onSectionAddBtnClickListener}
							btnStyle={styles.sectionInfo__addBtn}
							titleStyle={styles.sectionInfo__addBtn__Text}
						/>
					</View>
					<View style={styles.submit}>
						<CustomBtn
							title={PROCESS_TEXT.SUBMIT}
							btnStyle={styles.submit__btn}
							titleStyle={styles.sumbit__text}
							onClickListener={onsumbitBtnClickListener}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}

export default ReservationProcess;
