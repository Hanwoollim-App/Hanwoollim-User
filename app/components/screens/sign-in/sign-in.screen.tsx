import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
} from 'react-native';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import { useAsyncCallback } from 'react-async-hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
	color,
	ICTAButton,
	postUserSignIn,
	updateAuthToken,
	getUserInfo,
	useUserInfo,
	IModalValue,
} from '../../../utils';
import { SignInForm } from './components';
import { CTAButton, StatusBar, Modal } from '../../layout';

import { textLightLogoImage } from '../../../assets';
import { defaultValues, SIGN_IN_SCHEMA } from './sign-in.data';
import { ISignInFormData } from './sign-in.type';

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	header: {
		width: '100%',
		height: heightPercentage(57),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.mainColor,
	},
	headerImg: {
		width: widthPercentage(203),
		height: heightPercentage(62.4),
	},
	titleText: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: fontPercentage(15),
		textAlign: 'center',
		color: '#00203f',
		marginTop: heightPercentage(50),
	},
	middleGap: {
		marginTop: heightPercentage(75),
	},
	content: {
		alignItems: 'center',
	},
	btnStyle: {
		width: widthPercentage(290),
		height: heightPercentage(53),
		borderRadius: widthPercentage(21),
		backgroundColor: '#00203f',
		...Platform.select({
			ios: {
				shadowColor: 'rgba(0, 0, 0, 0.16)',
				shadowOffset: {
					width: 0,
					height: heightPercentage(3),
				},
				shadowRadius: widthPercentage(6),
			},
			android: {
				elevation: 1,
			},
		}),
		marginTop: heightPercentage(300),
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTextStyle: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: fontPercentage(20),
		justifyContent: 'center',
		textAlign: 'center',
		color: '#ffffff',
	},
});

const isApprovedAccount = (position: string): boolean => {
	const isValidAccount: boolean = position !== 'not_approved';

	return isValidAccount;
};

export function SignIn() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const { formState, control, handleSubmit } = useForm({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(SIGN_IN_SCHEMA),
	});
	const { isSubmitSuccessful, isSubmitting, isValid } = formState;

	// useEffect(() => {
	// 	if (formState.isSubmitSuccessful) {
	// 	}
	// }, [formState]);

	const { setUser } = useUserInfo();

	const [modalValue, setModalValue] = useState<IModalValue>({
		isVisible: false,
		text: '',
	});

	const returnToSignIn = () => {
		setModalValue((prev) => ({
			...prev,
			isVisible: false,
		}));
	};

	const openErrorModal = (errText: string) => {
		setModalValue({
			isVisible: true,
			text: errText,
		});
	};

	const modalBtn: Array<ICTAButton> = [
		{
			buttonText: '확인',
			buttonClickListener: returnToSignIn,
		},
	];

	const { execute: handleSignIn, loading: isSigningIn } = useAsyncCallback(
		async (id, pw) => {
			const isError = await postUserSignIn(id, pw)
				.then(async ({ data: signInData }) => {
					console.log(signInData);
					const { accessToken, position } = signInData;

					updateAuthToken(accessToken);
					await getUserInfo().then(({ data: userInfoData }) => {
						const { userName, major, studentId } = userInfoData;

						setUser({
							userName,
							major,
							studentId,
						});

						if (isApprovedAccount(position)) {
							navigation.replace('BottomTabNavigator');
							return;
						}
						navigation.replace('NotApproved');
					});
					return false;
				})
				.catch((err) => {
					console.log(err);
					if (err.response.status === 404) {
						openErrorModal('아이디가 존재하지 않습니다.');
						return true;
					}
					if (err.response.status === 401) {
						openErrorModal('비밀번호가 잘못되었습니다.');
						return true;
					}
					if (err.response.status === 500) {
						openErrorModal('예상치 못한 에러가 발생하였습니다.');
						return true;
					}
					return true;
				});
		},
	);

	const handlePressLoginBtn = async (data: ISignInFormData) => {
		// if (isSubmitting || isSubmitSuccessful) {
		// 	return;
		// }
		await handleSignIn(data.id, data.pw);
	};

	return (
		<>
			<StatusBar />
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={styles.root}>
					<Modal
						isLoading={isSigningIn}
						mdVisible={modalValue.isVisible}
						title={modalValue.text}
						buttonList={modalBtn}
					/>
					<View style={styles.header}>
						<View>
							<Image source={textLightLogoImage} style={styles.headerImg} />
						</View>
					</View>
					<Text style={styles.titleText}>
						어서오세요 당신을 기다리고 있었어요!!
					</Text>
					<View style={styles.middleGap}></View>
					<View style={styles.content}>
						<Controller
							control={control}
							name="id"
							render={({ field: { onChange, value: currentId } }) => {
								return (
									<SignInForm
										placeholder={'아이디'}
										inputChangeListener={onChange}
										value={currentId}
									/>
								);
							}}
						/>
						<Controller
							control={control}
							name="pw"
							render={({ field: { onChange, value: currentPW } }) => {
								return (
									<SignInForm
										placeholder={'비밀번호'}
										inputChangeListener={onChange}
										value={currentPW}
									/>
								);
							}}
						/>
						<CTAButton
							title={'로그인'}
							titleStyle={styles.btnTextStyle}
							btnStyle={styles.btnStyle}
							onClickListener={handleSubmit(handlePressLoginBtn)}
							disabled={!isValid}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
}
