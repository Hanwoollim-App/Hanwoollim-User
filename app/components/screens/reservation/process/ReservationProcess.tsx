import React, {MutableRefObject, useCallback, useContext, useEffect, useRef, useState} from "react";
import {View, StyleSheet, Text} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {useNavigation} from "@react-navigation/native";
import LoginContext from "../../../../utils/context/LoginContext";
import CustomBtn from "../../../common/CustomBtn";
import Header from "./Header";
import SelectForm from "./SelectForm";
import color from "../../../../utils/constant/common/design/Color";
import {dayItems, MODAL_TEXT, PROCESS_TEXT, reserveDataInterface, sectionItems, timeItems, unitItems} from "../../../../utils/constant/reservation/process/ReservationProcessUtil";
import CustomModal from "../../../common/CustomModal";
import {fontPercentage, heightPercentage, widthPercentage} from "../../../../utils/constant/common/design/Responsive";
import {loginInterface} from "./../../../../utils/constant/login/LoginUtils";

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
	const navigation = useNavigation();
	const login : loginInterface = useContext(LoginContext);
	const [profile] = login.profile;

	const [modalVisible, setModalVisible]: [boolean, Function] = useState(false);
	const [sectionInfoCount, setSectionInfoCount]: [number[], Function] = useState([1]);
	const [modalText, setModalText] : [string, Function] = useState("");

	useEffect(() => {
		if (modalText !== "") { setModalVisible(true); }
	}, [modalText]);
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
		// PickerSelect로 붙어 가져오는 변수
		const sessionValue1 : any = sectionRef1.current.state.selectedItem.value;
		let sessionValue2 : any = {num: 0};
		let sessionValue3 : any = {num: 0};
		// JSON 파일에 이용되는 변수
		let dataSession1 : number = 0;
		let dataSession2 : number = 0;

		if (sectionInfoCount.length >= 2) {
			sessionValue2 = sectionRef2.current.state.selectedItem.value;
		}
		if (sectionInfoCount.length >= 3) {
			sessionValue3 = sectionRef3.current.state.selectedItem.value;
		}
		// 팀 예약 -> 프로토타입에서는 방지
		if (unit === 2) {
			setModalText(MODAL_TEXT.NO_TEAM_TITLE);
			return;
		}
		const {sessionID: ID1, num: num1} = sessionValue1;

		console.log(ID1, num1);
		if (sessionValue2.num !== 0) {
			const {sessionID: ID2, num: num2} = sessionValue2;

			if (sessionValue3.num !== 0) { // 세션 3개를 선택했을 경우
				const {sessionID: ID3, num: num3} = sessionValue3;


				switch (ID1) {
					case 1 :
						dataSession1 += num1;
						break;
					case 2 :
						dataSession2 += num1;
						break;
					default:
						setModalText(MODAL_TEXT.FAILED);
						return;
				}
				switch (ID2) {
					case 1 :
						dataSession1 += num2;
						break;
					case 2 :
						dataSession2 += num2;
						break;
					default:
						setModalText(MODAL_TEXT.FAILED);
						return;
				}
				switch (ID3) {
					case 1 :
						dataSession1 += num3;
						break;
					case 2 :
						dataSession2 += num3;
						break;
					default:
						setModalText(MODAL_TEXT.FAILED);
						return;
				}
			} else { // 세션 2개를 선택했을 경우
				// 중복된 세션
				if (ID1 === ID2 && num1 === num2) {
					// 기타가 아닌 경우
					if (!(ID1 === 1 && num1 === 4) && !(ID1 === 1 && num2 === 2)) {
						// 베이스
						if (ID1 === 1 && num1 === 1) {
							setModalText(MODAL_TEXT.BASE_NUM_OVER);
							return;
						}
						// 드럼
						if (ID1 === 2 && num1 === 4) {
							setModalText(MODAL_TEXT.DRUM_NUM_OVER);
							return;
						}
						// 건반
						if (ID1 === 2 && num1 === 2) {
							setModalText(MODAL_TEXT.KEYBOARD_NUM_OVER);
							return;
						}
						// 보컬
						if (ID1 === 2 && num1 === 1) {
							setModalText(MODAL_TEXT.VOCAL_NUM_OVER);
							return;
						}
					}
					setModalText(MODAL_TEXT.NOT_VALID_TWO_GUITAR_SELECT);
					return;
				}
				switch (ID1) {
					case 1 :
						dataSession1 += num1;
						break;
					case 2 :
						dataSession2 += num1;
						break;
					default:
						setModalText(MODAL_TEXT.FAILED);
						return;
				}
				switch (ID2) {
					case 1 :
						dataSession1 += num1;
						break;
					case 2 :
						dataSession2 += num1;
						break;
					default:
						setModalText(MODAL_TEXT.FAILED);
						return;
				}
			}
		} else { // 세션 1개를 선택했을 경우
			switch (ID1) {
				case 1 :
					dataSession1 += num1;
					break;
				case 2 :
					dataSession2 += num1;
					break;
				default:
					setModalText(MODAL_TEXT.FAILED);
					return;
			}
		}
		const dateData = new Date(date);

		dateData.setHours(time);
		dateData.setMinutes(0);
		dateData.setSeconds(0);
		dateData.setMilliseconds(0);
		const data : reserveDataInterface = {
			session1: dataSession1,
			session2: dataSession2,
			Id: profile.id,
			date: dateData,
		};

		console.log(data);

		setModalText(MODAL_TEXT.SUCCESS_TITLE);
	}, []);
	const {currentWeek}: any = route.params;

	return (
		<View style={styles.root}>
			<CustomModal
				mdVisible={modalVisible}
				title={modalText}
				firstButton={() => {
					setModalVisible(false);
					if (modalText === MODAL_TEXT.SUCCESS_TITLE) {
						navigation.navigate("BottomTabNavigator", {
							screen: "Home",
						});
					}
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
