import React, {useState} from "react";
import {View, StyleSheet, Text} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {useNavigation} from "@react-navigation/native";
import CustomBtn from "../../../common/CustomBtn";
import Header from "./Header";
import SelectForm from "./SelectForm";
import color from "../../../../utils/constant/common/design/Color";
import {dayItems, MODAL_TEXT, PROCESS_TEXT, sectionItems, timeItems, unitItems} from "../../../../utils/constant/reservation/process/ReservationProcessUtil";
import CustomModal from "../../../common/CustomModal";

const pickerStyle = StyleSheet.create({
	inputIOS: {
		width: "100%",
		height: "100%",
	},
	inputAndroid: {
		width: "100%",
		height: "100%",
	},
});


const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	headerContainer: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		borderBottomColor: "black",
		borderWidth: 1, // 임시로 구별하기 위해서 만들어놓았습니다. 작업이 다 끝나면 없앨 예정입니다.
	},
	bodyContainer: {
		flex: 13.2,
		width: "100%",
	},
	dayPicker: {
		width: 113,
		height: 26,
		marginLeft: 25,
		marginTop: 29,
		borderWidth: 1,
		borderColor: color.mainColor,
	},
	contentContainer: {
		alignItems: "center",
	},
	timeBox: {
		width: 327,
		height: 41,
		marginTop: 17,
		borderRadius: 12,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#bdbdbd",
	},
	defaultInfo: {
		width: 327,
		height: 151,
		marginTop: 15,
		borderRadius: 11,
		backgroundColor: "#ffffff",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#bdbdbd",
	},
	defaultInfo__form: {
		flexDirection: "row",
		marginTop: 32,
	},
	sectionInfo: {
		width: 327,
		height: 118,
		marginTop: 13,
		borderRadius: 11,
		backgroundColor: "#ffffff",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#bdbdbd",
	},
	sectionInfo__form: {
		flexDirection: "row",
		marginTop: 32,
	},
	alertText: {
		marginTop: 8,
		marginLeft: 140,
		fontFamily: "KoreanYNSJG2",
		fontSize: 8,
		lineHeight: 11,
		letterSpacing: 0,
		textAlign: "left",
		color: "#363636",
	},
	addBtn: {
		width: 130,
		height: 20,
		marginTop: 23,
		marginLeft: 174,
	},
	addBtnText: {
		width: "100%",
		height: "100%",
		fontFamily: "KoreanYNSJG4",
		fontSize: 12,
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: 16,
		letterSpacing: 0,
		textAlign: "left",
		color: color.mainColor,
	},
	submit: {
		width: 290,
		height: 42,
		marginTop: 220,
		borderRadius: 21,
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
		fontSize: 13,
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: 18,
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
});


function ReservationProcess({route}) {
	const [modalVisible, setModalVisible] : [boolean, Function] = useState(false);
	const [sectionInfoCount, setSectionInfoCount] : [number[], Function] = useState([1]);
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
		const newItem : number = sectionInfoCount.length + 1;

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
						style={pickerStyle}
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
									pickerStyle,
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
									pickerStyle,
									items: timeItems,
									value: timeItems[0],
									onValueChange: onTimeChangeListener,
								}}
							/>
						</View>
						<Text style={styles.alertText}>
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
											pickerStyle,
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
							btnStyle={styles.addBtn}
							titleStyle={styles.addBtnText}
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