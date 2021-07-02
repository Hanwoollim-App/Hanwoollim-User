import React, { useEffect, useContext } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	StatusBar,
	SafeAreaView,
	Platform,
} from 'react-native';
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import color from '../../../utils/constant/common/design/Color';
import LoginContext from '../../../utils/context/LoginContext';
import {
	LOGIN_BUTTON_TEXT,
	LOGIN_TITLE_TEXT,
} from '../../../utils/constant/login/LoginScreenUtils';
import {
	loginInterface,
	PROFILE_EMPTY,
	TOKEN_EMPTY,
} from '../../../utils/constant/login/LoginUtils';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/common/design/Responsive';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';

const styles = StyleSheet.create({
	root: {
		flex: 1,
		width: '100%',
		backgroundColor: color.mainColor,
	},
	title: {
		flexBasis: heightPercentage(287),
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	titleText: {
		fontSize: fontPercentage(50),
		lineHeight: fontPercentage(75),
		fontWeight: 'normal',
		fontStyle: 'normal',
		textAlign: 'center',
		color: '#ffffff',
	},
	titleUnderBar: {
		width: widthPercentage(261),
		height: heightPercentage(3),
		borderWidth: widthPercentage(0.5),
		marginTop: heightPercentage(5),
		marginLeft: 'auto',
		marginRight: 'auto',
		backgroundColor: '#adefd1',
		borderStyle: 'solid',
		borderColor: '#707070',
	},
	login: {
		height: heightPercentage(250),
		marginTop: heightPercentage(269),
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	loginBtn: {
		width: widthPercentage(212),
		height: heightPercentage(52),
		borderRadius: widthPercentage(15),
		backgroundColor: color.subColor,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
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
	},
	loginBtn_img: {
		width: widthPercentage(44),
		height: heightPercentage(44),
	},
	loginBtn_text: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(15),
		lineHeight: fontPercentage(20),
		fontWeight: 'bold',
		fontStyle: 'normal',
		textAlign: 'left',
		color: '#3c1e1e',
	},
});

const kakaoIcon = require('../../../assets/images/kakaoLogo.png');

function Login() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();
	const login: loginInterface = useContext(LoginContext);
	const [token, setToken] = login.token;
	const [profile, setProfile] = login.profile;

	useEffect(() => {
		if (!KakaoLogins) {
			console.error('Module is Not Linked');
		}
	}, []);
	useEffect(() => {
		if (token === TOKEN_EMPTY || profile === PROFILE_EMPTY) return;
		navigation.navigate('SignUp');
	}, [token, profile]);

	const kakaoLogin = async () =>
		KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
			.then((result) => {
				setToken(result.accessToken);
				return true;
			})
			.catch((err) => {
				if (err.code === 'E_CANCELLED_OPERATION') {
					console.log(`Login Cancelled:${err.message}`);
				}
				console.log(`Login Failed:${err.code} ${err.message}`);
				return false;
			});
	const getProfile = async () =>
		KakaoLogins.getProfile()
			.then((result) => {
				setProfile(result);
			})
			.catch((err) => {
				console.log(`Get Profile Failed:${err.code} ${err.message}`);
			});

	const loginBtnClickListener = async () => {
		navigation.navigate('SignUp');
		if (!(await kakaoLogin())) return;
		await getProfile();
	};

	return (
		<>
			<StatusBar backgroundColor={color.mainColor} />
			<SafeAreaView style={styles.root}>
				<View style={styles.title}>
					<Text style={styles.titleText}>{`${LOGIN_TITLE_TEXT}`}</Text>
					<View style={styles.titleUnderBar} />
				</View>
				<View style={styles.login}>
					<TouchableOpacity
						style={styles.loginBtn}
						onPress={loginBtnClickListener}>
						<Image style={styles.loginBtn_img} source={kakaoIcon} />
						<Text style={styles.loginBtn_text}>{`${LOGIN_BUTTON_TEXT}`}</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</>
	);
}

export default Login;
