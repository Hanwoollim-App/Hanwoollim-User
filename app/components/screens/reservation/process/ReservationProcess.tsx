import React, {MutableRefObject, useCallback, useRef, useState} from "react";
import {View, StyleSheet, Text} from "react-native";
import RNPickerSelect, {PickerSelectProps} from "react-native-picker-select";
import {useNavigation} from "@react-navigation/native";
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
		fontSize: fontPercentage(10),
		letterSpacing: 0,
		textAlign: "left",
		color: "#000000",
	},
	inputAndroid: {
		width: "100%",
		height: "100%",
		paddingVertical: 2, // 이 변수가 있어야 텍스트가 박스 안쪽으로 들어옴
		fontSize: fontPercentage(12),
		fontFamily: "KoreanYNSJG3",
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
		height: heightPercentage(57),
		flexDirection: "row",
		alignItems: "center",
		borderBottomColor: "black",
		borderWidth: 1, // 임시로 구별하기 위해서 만들어놓았습니다. 작업이 다 끝나면 없앨 예정입니다.
	},
	bodyContainer: {
		width: widthPercentage(327),
		height: heightPercentage(760),
		marginHorizontal: widthPercentage(25),
		marginTop: heightPercentage(29),
	},
	dayPicker: {
		width: widthPercentage(113),
		height: heightPercentage(26),
		borderWidth: fontPercentage(1),
		borderColor: color.mainColor,
	},
	contentContainer: {
		alignItems: "center",
	},
	timeBox: {
		width: "100%",
		height: heightPercentage(41),
		marginTop: heightPercentage(17),
		borderRadius: fontPercentage(12),
		borderStyle: "solid",
		borderWidth: fontPercentage(1),
		borderColor: "#bdbdbd",
	},
	defaultInfo: {
		width: "100%",
		marginTop: heightPercentage(15),
		paddingBottom: heightPercentage(26),
		borderRadius: fontPercentage(11),
		backgroundColor: "white",
		borderStyle: "solid",
		borderWidth: fontPercentage(1),
		borderColor: "#bdbdbd",
	},
	defaultInfo__form: {
		flexDirection: "row",
		marginTop: heightPercentage(39),
	},
	sectionInfo: {
		width: "100%",
		marginTop: heightPercentage(13),
		paddingBottom: heightPercentage(25),
		borderRadius: fontPercentage(11),
		backgroundColor: "#ffffff",
		borderStyle: "solid",
		borderWidth: fontPercentage(1),
		borderColor: "#bdbdbd",
	},
	sectionInfo__form: {
		flexDirection: "row",
		marginTop: heightPercentage(32),
	},
	sectionInfo__alert__text: {
		marginTop: heightPercentage(8),
		marginLeft: widthPercentage(140),
		fontFamily: "KoreanYNSJG2",
		fontSize: fontPercentage(8),
		letterSpacing: 0,
		textAlign: "left",
		color: "#363636",
	},
	sectionInfo__addBtn: {
		width: widthPercentage(130),
		height: heightPercentage(30),
		marginTop: heightPercentage(23),
		marginLeft: widthPercentage(174),
	},
	sectionInfo__addBtn__Text: {
		width: "100%",
		height: "100%",
		fontFamily: "KoreanYNSJG4",
		fontSize: fontPercentage(12),
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: color.mainColor,
	},
	submit: {
		position: "absolute",
		width: widthPercentage(290),
		height: heightPercentage(42),
		marginTop: heightPercentage(550),
		borderRadius: fontPercentage(21),
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
		fontSize: fontPercentage(13),
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
});

function ReservationProcess({route}) {
	const [modalVisible, setModalVisible]: [boolean, Function] = useState(false);
	const [sectionInfoCount, setSectionInfoCount]: [number[], Function] = useState([1]);
	const navigation = useNavigation();
	const [date, setDate] : [Date, Function] = useState(new Date());
	const unitRef : MutableRefObject<any> = useRef();
	const timeRef : MutableRefObject<any> = useRef();
	const sectionRef1 : MutableRefObject<any> = useRef();
	const sectionRef2 : MutableRefObject<any> = useRef();
	const sectionRef3 : MutableRefObject<any> = useRef();
	const sectionRefArray : Array<MutableRefObject<any>> = [
		sectionRef1,
		sectionRef2,
		sectionRef3,
	];
	const onSectionAddBtnClickListener = useCallback(() => {
		const newItem: number = sectionInfoCount.length + 1;

		if (newItem === 4) return;
		setSectionInfoCount((prev : number[]) => [
			...prev,
			newItem,
		]);
	}, []);
	const onDayChangeListener = useCallback((value) => {
		setDate((prev: Date) => {
			const ret : Date = {...prev};

			ret.setDate(prev.getDate() - prev.getDay() + value);
			return ret;
		});
	}, []);
	const onsumbitBtnClickListener = useCallback(() => {
		const unit : number = unitRef.current.state.selectedItem.value.num;
		const time : number = timeRef.current.state.selectedItem.value.num;
		const sectionValue1 : number = sectionRef1.current.state.selectedItem.value.num;
		let sectionValue2 : number = 0;
		let sectionValue3 : number = 0;

		if (sectionInfoCount.length >= 2) {
			sectionValue2 = sectionRef2.current.state.selectedItem.value.num;
		}
		if (sectionInfoCount.length >= 3) {
			sectionValue3 = sectionRef3.current.state.selectedItem.value.num;
		}
		console.log(`unit : ${unit}`);
		console.log(`time : ${time}`);
		console.log(`sectionValue1 : ${sectionValue1}`);
		console.log(`sectionValue2 : ${sectionValue2}`);
		console.log(`sectionValue3 : ${sectionValue3}`);
		setModalVisible(true);
	}, []);
	const {currentWeek}: any = route.params;

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
						onValueChange={(value) => onDayChangeListener(value)}
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
									ref: unitRef,
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
									ref: timeRef,
								}}
							/>
						</View>
						<Text style={styles.sectionInfo__alert__text}>
							{PROCESS_TEXT.ALERT}
						</Text>
					</View>
					<View style={styles.sectionInfo}>
						{
							sectionInfoCount.map((value, index) => (
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
											ref: sectionRefArray[index],
										}}
									/>
								</View>
							))
						}
						{
							sectionInfoCount.length !== 3 && (
								<CustomBtn
									title={PROCESS_TEXT.SECTION_ADD}
									onClickListener={onSectionAddBtnClickListener}
									btnStyle={styles.sectionInfo__addBtn}
									titleStyle={styles.sectionInfo__addBtn__Text}
								/>
							)
						}

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
