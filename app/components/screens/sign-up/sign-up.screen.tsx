import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from '@react-navigation/native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { useAsyncCallback } from 'react-async-hook';
import { Controller, useForm } from 'react-hook-form';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
	color,
	SIGN_UP_COMPONENT_TEXT,
	majorItem,
	ICTAButton,
	postUserSignUp,
} from '../../../utils';
import { ScreenWrapper, Modal, CTAButton } from '../../layout';
import { SignUpForm } from './components';
import { defaultValues, SIGN_UP_SCHEMA } from './sign-up.data';
import { ISignUpFormData } from './sign-up.type';

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
		alignItems: 'center',
	},
	keyboardAware: { width: '100%' },
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

export function SignUp() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const { formState, control, handleSubmit } = useForm({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(SIGN_UP_SCHEMA),
	});
	const { isDirty, isSubmitSuccessful, isSubmitting, isValid } = formState;

	const [modalValue, setModalValue] = useState({
		isVisible: false,
		text: '',
	});
	const returnToSignUp = () => {
		setModalValue((prev) => ({
			...prev,
			isVisible: false,
		}));
	};
	const modalBtn: Array<ICTAButton> = [
		{
			buttonText: '확인',
			buttonClickListener: returnToSignUp,
		},
	];

	const openErrorModal = (errText: string) => {
		setModalValue((prev) => ({
			...prev,
			isVisible: true,
			text: errText,
		}));
	};

	const [items, setItems] = useState<Array<ItemType>>(majorItem);
	const [open, setOpen] = useState<boolean>(false);

	const { execute: handleSignUp, loading: isSigningUp } = useAsyncCallback(
		async (id, pw, pwCheck, name, major, studentID) => {
			if (pwCheck !== pw) {
				openErrorModal('비밀번호가 다릅니다');
				return;
			}
			await postUserSignUp(id, pw, name, major, studentID)
				.then(() => {
					navigation.navigate('SignIn');
				})
				.catch((err) => {
					const errorMessage = err.response.data.message;

					if (err.response.status === 400) {
						if (errorMessage.startsWith('Failed! ID is already in use!')) {
							openErrorModal('아이디가 중복됩니다');
							return;
						}
						if (
							errorMessage.startsWith('Failed! Student Id is already in use!')
						) {
							openErrorModal('학번이 중복됩니다');
							return;
						}
						if (errorMessage.startsWith('학번은 10자리만 입력가능합니다.')) {
							openErrorModal('학번은 10자리입니다.');
						}
					}
				});
		},
	);
	const handlePressSignUpBtn = async (data: ISignUpFormData) => {
		// if (isSubmitting || isSubmitSuccessful) {
		// 	return;
		// }
		await handleSignUp(
			data.id,
			data.pw,
			data.pwCheck,
			data.name,
			data.major,
			data.studentID,
		);
	};

	return (
		<ScreenWrapper>
			<Modal
				isLoading={isSigningUp}
				mdVisible={modalValue.isVisible}
				title={modalValue.text}
				buttonList={modalBtn}
			/>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<KeyboardAwareScrollView style={styles.keyboardAware}>
					<View style={styles.scrollView}>
						<Text style={styles.introText}>{SIGN_UP_COMPONENT_TEXT.intro}</Text>
						<View style={styles.middleEmpty} />
						<Controller
							control={control}
							name="id"
							render={({ field: { onChange, value: currentId } }) => {
								return (
									<SignUpForm
										placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.id}
										inputChangeListener={onChange}
										defaultValue={currentId}
									/>
								);
							}}
						/>
						<Controller
							control={control}
							name="pw"
							render={({ field: { onChange, value: currentPw } }) => {
								return (
									<SignUpForm
										placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.pw}
										inputChangeListener={onChange}
										defaultValue={currentPw}
										isSecureInput
									/>
								);
							}}
						/>
						<Controller
							control={control}
							name="pwCheck"
							render={({ field: { onChange, value: currentPwCheck } }) => {
								return (
									<SignUpForm
										placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.pwCheck}
										inputChangeListener={onChange}
										defaultValue={currentPwCheck}
										isSecureInput
									/>
								);
							}}
						/>
						<Controller
							control={control}
							name="name"
							render={({ field: { onChange, value: currentName } }) => {
								return (
									<SignUpForm
										placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.name}
										inputChangeListener={onChange}
										defaultValue={currentName}
									/>
								);
							}}
						/>
						<Controller
							control={control}
							name="major"
							render={({ field: { onChange, value: currentMajor } }) => {
								return (
									<DropDownPicker
										open={open}
										value={currentMajor}
										items={items}
										setOpen={setOpen}
										setValue={onChange}
										setItems={setItems}
										onChangeValue={onChange}
										style={styles.dropDown}
										textStyle={styles.dropDownText}
										dropDownContainerStyle={styles.dropDownContainer}
										placeholderStyle={styles.dropDownPlaceHolder}
										placeholder="전공"
									/>
								);
							}}
						/>
						<Controller
							control={control}
							name="studentID"
							render={({ field: { onChange, value: currentStudentID } }) => {
								return (
									<SignUpForm
										placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.studentID}
										inputChangeListener={onChange}
										defaultValue={currentStudentID}
									/>
								);
							}}
						/>
						<Text style={styles.alertText}>{SIGN_UP_COMPONENT_TEXT.alert}</Text>

						<CTAButton
							title={SIGN_UP_COMPONENT_TEXT.signUpBtn}
							onClickListener={handleSubmit(handlePressSignUpBtn)}
							btnStyle={styles.signUp}
							titleStyle={styles.signUpTitle}
							disabled={!isValid}
						/>
					</View>
				</KeyboardAwareScrollView>
			</TouchableWithoutFeedback>
		</ScreenWrapper>
	);
}
