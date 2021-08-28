import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/common/design/Responsive';
import color from '../../../utils/constant/common/design/Color';
import SignInForm from './Form';
import CustomBtn from '../../common/CustomBtn';
import CustomStatusBar from '../../common/CustomStatusBar';
import CustomModal from '../../common/CustomModal';
import { customBtnType } from '../../../utils/types/customModal';
import api from '../../../utils/constant/api';
import userInterface, {
	UserInfoContext,
} from '../../../utils/context/UserInfoContext';

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

function SignIn() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();
	const { setUser }: userInterface = useContext(UserInfoContext);
	const headerLogo = require('../../../assets/images/textLogo_light.png');
	const [id, setId] = useState<string>('');
	const [pw, setPw] = useState<string>('');

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

	const [modalValue, setModalValue] = useState({
		isVisible: false,
		text: '',
		buttonList: { modalBtn },
	});

	const signInBtnClickListener = () => {
		api
			.post('/user/signIn', {
				id,
				password: pw,
			})
			.then(({ data }) => {
				console.log(data);
				const { accessToken } = data;

				api.defaults.headers['x-access-token'] = accessToken;
				if (data.position === 'not_approved') {
					console.log('notApproved');
					api.get('/user/info').then((res) => {
						const { userName } = res.data;

						setUser((prevUser) => ({
							...prevUser,
							userName,
						}));
						navigation.navigate('NotApproved');
					});
				} else if (data.position === 'chairman' || 'admin' || 'user') {
					console.log('Approved');
					api.get('/user/info').then((res) => {
						const { userName, major, studentId } = res.data;

						setUser((prevUser) => ({
							...prevUser,
							userName,
							major,
							studentId,
						}));
						navigation.navigate('BottomTabNavigator');
					});
				}
			})
			.catch((err) => {
				console.log(err.response);
				if (id === '') {
					setModalValue((prev) => ({
						...prev,
						isVisible: true,
						text: '아이디를 입력해주세요',
					}));
					return;
				}
				if (pw === '') {
					setModalValue((prev) => ({
						...prev,
						isVisible: true,
						text: '비밀번호를 입력해주세요',
					}));
					return;
				}
				if (err.response.status === 404) {
					setModalValue((prev) => ({
						...prev,
						isVisible: true,
						text: '아이디가 존재하지 않습니다',
					}));
					return;
				}
				if (err.response.status === 401) {
					setModalValue((prev) => ({
						...prev,
						isVisible: true,
						text: '비밀번호가 잘못되었습니다',
					}));
					return;
				}
				if (err.response.status === 500) {
					setModalValue((prev) => ({
						...prev,
						isVisible: true,
						text: '예상치 못한 에러가 발생하였습니다',
					}));
				}
			});
	};

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
						<Image style={styles.headerImg} source={headerLogo} />
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

export default SignIn;
