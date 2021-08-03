import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import color from '../../../utils/constant/common/design/Color';
import {
	SIGN_UP_COMPONENT_TEXT,
	SIGN_UP_ERROR_MESSAGE,
} from '../../../utils/constant/login/singUpScreen';
import CustomBtn from '../../common/CustomBtn';
import SignUpForm from './Form';
import CustomModal, { ModalValue } from '../../common/CustomModal';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/common/design/Responsive';
import ScreenWrapper from '../../common/ScreenWrapper';

const styles = StyleSheet.create({
	barStyle: {
		backgroundColor: color.mainColor,
	},
	root: {
		flex: 1,
	},
	header: {
		height: heightPercentage(141),
		justifyContent: 'center',
		backgroundColor: color.mainColor,
	},
	headerText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(32),
		lineHeight: fontPercentage(40),
		letterSpacing: 0,
		fontWeight: 'bold',
		fontStyle: 'normal',
		textAlign: 'center',
		color: '#ffffff',
	},
	scrollView: {
		width: '100%',
	},
	scrollContent: {
		alignItems: 'center',
	},
	introText: {
		marginTop: heightPercentage(40),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(15),
		lineHeight: fontPercentage(20),
		letterSpacing: 0,
		fontWeight: 'bold',
		fontStyle: 'normal',
		textAlign: 'center',
		color: '#00203f',
	},
	middleEmpty: {
		height: heightPercentage(20),
	},
	input: {
		height: heightPercentage(33),
		marginTop: heightPercentage(53),
		flexDirection: 'row',
		alignItems: 'center',
	},
	alertText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(13),
		lineHeight: fontPercentage(18),
		letterSpacing: 0,
		fontWeight: 'normal',
		fontStyle: 'normal',
		textAlign: 'center',
		color: '#777777',
	},
	signUp: {
		width: '77.3%',
		height: heightPercentage(53),
		marginTop: heightPercentage(33),
		borderRadius: fontPercentage(15),
		backgroundColor: color.mainColor,
		...Platform.select({
			ios: {
				shadowColor: 'rgba(0, 0, 0, 0.16)',
				shadowOffset: {
					width: 0,
					height: heightPercentage(3),
				},
				shadowRadius: widthPercentage(6),
				shadowOpacity: widthPercentage(1),
			},
			android: {
				elevation: 1,
			},
		}),
		justifyContent: 'center',
		alignItems: 'center',
	},
	signUpTitle: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(20),
		lineHeight: fontPercentage(25),
		letterSpacing: 0,
		fontWeight: 'bold',
		fontStyle: 'normal',
		color: '#ffffff',
	},
});

function SignUp() {
	const navigation = useNavigation();
	const [name, setName]: [string, Function] = useState('');
	const [studentID, setStudentID]: [string, Function] = useState('');
	const [modalValue, setModalValue]: [ModalValue, Function] = useState({
		isVisible: false,
		mainTitle: '',
	});

	const signUpBtnClickListener = () => {
		navigation.navigate('BottomTabNavigator', {
			screen: 'Home',
		});
	};
	const [major, setMajor] = useState('');
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState([
		{ label: '정보시스템학과', value: '정보시스템학과' },
		{ label: '기계공학부', value: '기계공학부' },
		{ label: '컴퓨터소프트웨어학부', value: '컴퓨터소프트웨어학부' },
		{ label: '융합전자공학부', value: '융합전자공학부' },
	]);

	return (
		<ScreenWrapper>
			<CustomModal
				isVisible={modalValue.isVisible}
				title={modalValue.mainTitle}
				firstButton={() =>
					setModalValue((prev: ModalValue) => ({
						...prev,
						isVisible: false,
					}))
				}
				firstBtnTitle={SIGN_UP_ERROR_MESSAGE.TRY_AGAIN_BTN}
			/>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}>
				<Text style={styles.introText}>{SIGN_UP_COMPONENT_TEXT.intro}</Text>
				<View style={styles.middleEmpty} />
				<SignUpForm
					placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.id}
					inputChangeListener={(value: string) => setName(value)}
					defaultValue={name}
				/>
				<SignUpForm
					placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.pw}
					inputChangeListener={(value: string) => setName(value)}
					defaultValue={name}
				/>
				<SignUpForm
					placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.pwCheck}
					inputChangeListener={(value: string) => setName(value)}
					defaultValue={name}
				/>
				<SignUpForm
					placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.name}
					inputChangeListener={(value: string) => setName(value)}
					defaultValue={name}
				/>
				<DropDownPicker
					open={open}
					value={major}
					items={items}
					setOpen={setOpen}
					setValue={setMajor}
					setItems={setItems}
					style={{
						width: '90%',
						height: heightPercentage(46),
						marginBottom: heightPercentage(31),
						paddingVertical: 0,
						alignContent: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						marginLeft: widthPercentage(17),
						borderRadius: widthPercentage(10),
						backgroundColor: '#ffffff',
						borderColor: '#ffffff',
					}}
					textStyle={{
						fontFamily: 'NotoSansKR-Regular',
						fontSize: 16,
						fontWeight: 'bold',
					}}
					dropDownContainerStyle={{
						width: '90%',
						marginBottom: heightPercentage(31),
						marginLeft: widthPercentage(17),
						borderRadius: widthPercentage(10),
						backgroundColor: '#ffffff',
						borderColor: '#ffffff',
					}}
					placeholderStyle={{
						color: '#a2a2a2',
					}}
					placeholder="전공"
				/>
				<SignUpForm
					placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.studentID}
					inputChangeListener={(value: string) => setStudentID(value)}
					defaultValue={studentID}
				/>
				<Text style={styles.alertText}>{SIGN_UP_COMPONENT_TEXT.alert}</Text>
				<CustomBtn
					title={SIGN_UP_COMPONENT_TEXT.signUpBtn}
					onClickListener={signUpBtnClickListener}
					btnStyle={styles.signUp}
					titleStyle={styles.signUpTitle}
				/>
			</ScrollView>
		</ScreenWrapper>
	);
}

export default SignUp;
