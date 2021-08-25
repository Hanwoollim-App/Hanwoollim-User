import React, { useContext, useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Platform,
} from 'react-native';
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
	const headerLogo = require('../../../assets/images/textLogo_light.png');
	const [id, setId] = useState<string>('');
	const [pw, setPw] = useState<string>('');

	const [idErrorModalVisible, setIdErrorModalVisible] =
		useState<boolean>(false);
	const [pwErrorModalVisible, setPwErrorModalVisible] =
		useState<boolean>(false);
	const [idExistErrorModalVisible, setIdExistErrorModalVisible] =
		useState<boolean>(false);
	const [pwExistErrorModalVisible, setPwExistErrorModalVisible] =
		useState<boolean>(false);
	const [unexpectedErrorModalVisible, setUnexpectedErrorModalVisible] =
		useState<boolean>(false);

	const idErrorChangeVisible = () => {
		setIdErrorModalVisible(!idErrorModalVisible);
	};
	const pwErrorChangeVisible = () => {
		setPwErrorModalVisible(!pwErrorModalVisible);
	};
	const idExistErrorChangeVisible = () => {
		setIdExistErrorModalVisible(!idErrorModalVisible);
	};
	const pwExistErrorChangeVisible = () => {
		setPwExistErrorModalVisible(!pwExistErrorModalVisible);
	};
	const unexpectedErrorChangeVisible = () => {
		setUnexpectedErrorModalVisible(!unexpectedErrorModalVisible);
	};

	const returnToSignIn = () => {
		setIdErrorModalVisible(false);
		setPwErrorModalVisible(false);
		setIdExistErrorModalVisible(false);
		setPwExistErrorModalVisible(false);
		setUnexpectedErrorModalVisible(false);
	};

	const modalBtn: Array<customBtnType> = [
		{
			buttonText: '확인',
			buttonClickListener: returnToSignIn,
		},
	];
	const { setUser }: any = useContext(UserInfoContext);

	const getUserInfo = () => {
		api.get('/user/info').then(({ data }) => {
			const { userName, major, studentId } = data;

			setUser((prevUser) => ({
				...prevUser,
				userName,
				major,
				studentId,
			}));
			navigation.navigate('BottomTabNavigator');
			// navigation.navigate('BottomTabNavigator');
			// 이 콘솔로그가 처음 로그인할 때는 정의되지 않았다고 뜨지만 다시 로그인을 시도하면 정상적으로 출력됨
			// 즉 처음 로그인해서 홈화면에 올때까진 context에 정보를 못 담는것 같은데 이유가,,,
		});
	};

	// useEffect(() => {
	// 	if (user?.userName) {
	// 		navigation.navigate('BottomTabNavigator');
	// 	}
	// }, [user]);

	const signInBtnClickListener = () => {
		api
			.post('/user/signin', {
				id,
				password: pw,
			})
			.then(({ data }) => {
				console.log(data);
				if (data.position === 'not_approved') {
					navigation.navigate('NotApproved');
				}
				if (data.position === 'chairman' && 'admin' && 'user') {
					const { accessToken } = data;

					api.defaults.headers['x-access-token'] = accessToken;
					getUserInfo();
				}
			})
			.catch((err) => {
				console.log(err.response);
				if (id === '') {
					idErrorChangeVisible();
				}
				if (pw === '') {
					pwErrorChangeVisible();
				}
				if (err.response.status === 404) {
					idExistErrorChangeVisible();
				}
				if (err.response.status === 401) {
					pwExistErrorChangeVisible();
				}
				if (err.response.status === 500) {
					unexpectedErrorChangeVisible();
				}
			});
	};

	return (
		<>
			<CustomStatusBar />
			<View style={styles.root}>
				<CustomModal
					mdVisible={idErrorModalVisible}
					title={'아이디를 입력해주세요'}
					buttonList={modalBtn}
				/>
				<CustomModal
					mdVisible={pwErrorModalVisible}
					title={'비밀번호를 입력해주세요'}
					buttonList={modalBtn}
				/>
				<CustomModal
					mdVisible={idExistErrorModalVisible}
					title={'아이디가 존재하지 않습니다'}
					buttonList={modalBtn}
				/>
				<CustomModal
					mdVisible={pwExistErrorModalVisible}
					title={'비밀번호가 잘못되었습니다'}
					buttonList={modalBtn}
				/>
				<CustomModal
					mdVisible={unexpectedErrorModalVisible}
					title={'예상치 못한 오류가 발생했습니다'}
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
