import React, { useState } from 'react';
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import color from '../../../utils/constant/common/design/Color';
import { SIGN_UP_COMPONENT_TEXT } from '../../../utils/constant/login/singUpScreen';
import CustomBtn from '../../common/CustomBtn';
import SignUpForm from './Form';

import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/common/design/Responsive';
import ScreenWrapper from '../../common/ScreenWrapper';
import majorItem from '../../../utils/constant/login/majorItem';
import { ItemType, ValueType } from '../../../utils/types/dropDown';
import api from '../../../utils/constant/api';
import CustomModal from '../../common/CustomModal';
import { customBtnType } from '../../../utils/types/customModal';

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
	dropDown: {
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
	},
	dropDownText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 16,
		fontWeight: 'bold',
	},
	dropDownContainer: {
		width: '90%',
		marginBottom: heightPercentage(31),
		marginLeft: widthPercentage(17),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
	},
	dropDownPlaceHolder: {
		color: '#a2a2a2',
	},
});

/*
	방어로직 만들어야 하는것
	1) 학번이 10자리 체크
	2) pw 랑 pwCheck 이 같은지 체크
	3) 학번의 시작 4자리가 현재 년도보다 큰지 체크
	4) 빠짐없이 입력했는지 체크	
*/

function SignUp() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();
	const [name, setName] = useState<string>('');
	const [id, setId] = useState<string>('');
	const [pw, setPw] = useState<string>('');
	const [pwCheck, setPwCheck] = useState<string>('');
	const [studentID, setStudentID] = useState<string>('');
	const [major, setMajor] = useState<ValueType>('');
	const [open, setOpen] = useState<boolean>(false);
	const [items, setItems] = useState<Array<ItemType>>(majorItem);

	const [idOverlapErrorModalVisible, setIdOverlapErrorModalVisible] =
		useState<boolean>(false);
	const [
		studentIdOverlapErrorModalVisible,
		setStudentIdOverlapErrorModalVisible,
	] = useState<boolean>(false);
	const [idErrorModalVisible, setIdErrorModalVisible] =
		useState<boolean>(false);
	const [pwErrorModalVisible, setPwErrorModalVisible] =
		useState<boolean>(false);
	const [pwCheckErrorModalVisible, setPwCheckErrorModalVisible] =
		useState<boolean>(false);
	const [nameErrorModalVisible, setNameErrorModalVisible] =
		useState<boolean>(false);
	const [majorErrorModalVisible, setMajorErrorModalVisible] =
		useState<boolean>(false);
	const [studentIdErrorModalVisible, setStudentIdErrorModalVisible] =
		useState<boolean>(false);
	const [majorLengthErrorModalVisible, setMajorLengthErrorModalVisible] =
		useState<boolean>(false);

	const idOverlapErrorChangeVisible = () => {
		setIdOverlapErrorModalVisible(!idOverlapErrorModalVisible);
	};
	const studentIdOverlapErrorChangeVisible = () => {
		setStudentIdOverlapErrorModalVisible(!studentIdOverlapErrorModalVisible);
	};
	const idErrorChangeVisible = () => {
		setIdErrorModalVisible(!idErrorModalVisible);
	};
	const pwErrorChangeVisible = () => {
		setPwErrorModalVisible(!pwErrorModalVisible);
	};
	const pwCheckErrorChangeVisible = () => {
		setPwCheckErrorModalVisible(!pwCheckErrorModalVisible);
	};
	const nameErrorChangeVisible = () => {
		setNameErrorModalVisible(!nameErrorModalVisible);
	};
	const majorErrorChangeVisible = () => {
		setMajorErrorModalVisible(!majorErrorModalVisible);
	};
	const studentIdErrorChangeVisible = () => {
		setStudentIdErrorModalVisible(!studentIdErrorModalVisible);
	};
	const majorLengthErrorChangeVisible = () => {
		setMajorLengthErrorModalVisible(!majorLengthErrorModalVisible);
	};

	const returnToMain = () => {
		setIdOverlapErrorModalVisible(false);
		setStudentIdOverlapErrorModalVisible(false);
		setIdErrorModalVisible(false);
		setPwErrorModalVisible(false);
		setPwCheckErrorModalVisible(false);
		setNameErrorModalVisible(false);
		setMajorErrorModalVisible(false);
		setStudentIdErrorModalVisible(false);
		setMajorLengthErrorModalVisible(false);
	};
	const modalBtn: Array<customBtnType> = [
		{
			buttonText: '확인',
			buttonClickListener: returnToMain,
		},
	];

	const signUpBtnClickListener = () => {
		api
			.post('/user/signup', {
				id,
				password: pw,
				username: name,
				major,
				studentid: studentID,
			})
			.then((res) => {
				console.log(res);
				navigation.navigate('NotApproved');
			})
			.catch((err) => {
				console.log(err.response);
				if (err.response.status === 400) {
					if (err.response.data.message === 'Failed! ID is already in use!')
						idOverlapErrorChangeVisible();
					if (
						err.response.data.message ===
						'Failed! Student Id is already in use!'
					)
						studentIdOverlapErrorChangeVisible();
				}
				if (pwCheck !== pw) {
					pwCheckErrorChangeVisible();
				}
				if (err.response.status === 500) {
					if (err.response.data.message === '아이디 입력하세요')
						idErrorChangeVisible();
					if (err.response.data.message === '이름을 입력하세요')
						nameErrorChangeVisible();
					if (err.response.data.message === '전공을 입력하세요')
						majorErrorChangeVisible();
					if (err.response.data.message === '비밀번호를 입력하세요')
						pwErrorChangeVisible();
					if (err.response.data.message === '학번를 입력하세요')
						studentIdErrorChangeVisible();
				}
				if (studentID.length !== 10) {
					majorLengthErrorChangeVisible();
				}
			});
	};

	return (
		<ScreenWrapper>
			<CustomModal
				mdVisible={idOverlapErrorModalVisible}
				title={'아이디가 중복됩니다'}
				buttonList={modalBtn}
			/>
			<CustomModal
				mdVisible={studentIdOverlapErrorModalVisible}
				title={'학번이 중복됩니다'}
				buttonList={modalBtn}
			/>
			<CustomModal
				mdVisible={pwErrorModalVisible}
				title={'비밀번호를 입력해주세요'}
				buttonList={modalBtn}
			/>
			<CustomModal
				mdVisible={pwCheckErrorModalVisible}
				title={'비밀번호가 같지 않습니다'}
				buttonList={modalBtn}
			/>
			<CustomModal
				mdVisible={idErrorModalVisible}
				title={'아이디를 입력해주세요'}
				buttonList={modalBtn}
			/>
			<CustomModal
				mdVisible={nameErrorModalVisible}
				title={'이름을 입력해주세요'}
				buttonList={modalBtn}
			/>
			<CustomModal
				mdVisible={majorErrorModalVisible}
				title={'전공을 선택해주세요'}
				buttonList={modalBtn}
			/>
			<CustomModal
				mdVisible={studentIdErrorModalVisible}
				title={'학번을 입력해주세요'}
				buttonList={modalBtn}
			/>
			<CustomModal
				mdVisible={majorLengthErrorModalVisible}
				title={'학번은 10자리입니다!'}
				buttonList={modalBtn}
			/>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}>
				<Text style={styles.introText}>{SIGN_UP_COMPONENT_TEXT.intro}</Text>
				<View style={styles.middleEmpty} />
				<SignUpForm
					placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.id}
					inputChangeListener={(value: string) => setId(value)}
					defaultValue={id}
				/>
				<SignUpForm
					placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.pw}
					inputChangeListener={(value: string) => setPw(value)}
					defaultValue={pw}
					isSecureInput
				/>
				<SignUpForm
					placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.pwCheck}
					inputChangeListener={(value: string) => setPwCheck(value)}
					defaultValue={pwCheck}
					isSecureInput
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
					style={styles.dropDown}
					textStyle={styles.dropDownText}
					dropDownContainerStyle={styles.dropDownContainer}
					placeholderStyle={styles.dropDownPlaceHolder}
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
