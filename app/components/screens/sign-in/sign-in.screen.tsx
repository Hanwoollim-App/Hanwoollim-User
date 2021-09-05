import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import { useAsyncCallback } from 'react-async-hook';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
	color,
	customBtnType,
	userSignIn,
	updateAuthToken,
	getUserInfo,
	useUserInfo,
} from '../../../utils';
import { SignInForm } from './components';
import {
	CustomBtn,
	CustomStatusBar,
	CustomModal,
	LoadingModal,
} from '../../layout';

import { textLightLogoImage } from '../../../assets';
import { useLoadingModal } from '../../../utils/context/loading-modal.context';

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
	const [id, setId] = useState<string>('');
	const [pw, setPw] = useState<string>('');
	const { setUser } = useUserInfo();

	const [modalValue, setModalValue] = useState({
		isVisible: false,
		text: '',
	});

	const returnToSignIn = () => {
		setModalValue((prev) => ({
			...prev,
			isVisible: false,
		}));
	};
	const modalBtn: Array<customBtnType> = [
		{
			buttonText: '확인',
			buttonClickListener: returnToSignIn,
		},
	];

	const openErrorModal = (errText: string) => {
		setModalValue((prev) => ({
			...prev,
			isVisible: true,
			text: errText,
		}));
	};

	const { execute: signInBtnClickListener, loading: isSigningIn } =
		useAsyncCallback(
			async () => {
				const { data: signInData } = await userSignIn(id, pw);
				const { accessToken } = signInData;

				updateAuthToken(accessToken);

				const { data: userInfoData } = await getUserInfo();
				const { userName, major, studentId, position } = userInfoData;

				setUser((prevUser) => ({
					...prevUser,
					userName,
					major,
					studentId,
				}));

				if (isApprovedAccount(position)) {
					navigation.navigate('BottomTabNavigator');
					return;
				}
				navigation.navigate('NotApproved');
			},
			{
				onError: (err) => {
					if (id === '') {
						openErrorModal('아이디를 입력해주세요');
						return;
					}
					if (pw === '') {
						openErrorModal('비밀번호를 입력해주세요');
						return;
					}
					if (err.response.status === 404) {
						openErrorModal('아이디가 존재하지 않습니다.');
						return;
					}
					if (err.response.status === 401) {
						openErrorModal('비밀번호가 잘못되었습니다.');
						return;
					}
					if (err.response.status === 500) {
						openErrorModal('예상치 못한 에러가 발생하였습니다.');
					}
				},
			},
		);

	useLoadingModal([isSigningIn]);

	return (
		<>
			<CustomStatusBar />
			<View style={styles.root}>
				<CustomModal
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
					<SignInForm
						placeholder={'아이디'}
						inputChangeListener={(value: string) => setId(value)}
						defaultValue={id}
					/>
					<SignInForm
						placeholder={'비밀번호'}
						inputChangeListener={(value: string) => setPw(value)}
						defaultValue={pw}
						isSecureInput
					/>
					<CustomBtn
						title={'로그인'}
						titleStyle={styles.btnTextStyle}
						btnStyle={styles.btnStyle}
						onClickListener={signInBtnClickListener}
					/>
				</View>
			</View>
		</>
	);
}
