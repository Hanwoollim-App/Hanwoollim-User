import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	SafeAreaView,
	Platform,
} from 'react-native';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import {
	getProfile,
	KakaoOAuthToken,
	KakaoProfile,
	login,
} from '@react-native-seoul/kakao-login';
import color from '../../../utils/constant/common/design/Color';
import LOGIN_BUTTON_TEXT from '../../../utils/constant/login/LoginScreenUtils';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/common/design/Responsive';
import CustomStatusBar from '../../common/CustomStatusBar';

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
		top: '5%',
		width: '75%',
		height: '30%',
		resizeMode: 'cover',
	},
	titleUnderBar: {
		width: widthPercentage(261),
		height: heightPercentage(3),
		borderWidth: widthPercentage(0.5),
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
		resizeMode: 'contain',
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
const textLogo = require('../../../assets/images/textLogo_light.png');

function Login() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const kakaoLogin = async (): Promise<void> => {
		const token: KakaoOAuthToken = await login();
		const profile: KakaoProfile = await getProfile();

		console.log(token);
		console.log(profile);
	};

	const loginBtnClickListener = async () => {
		await kakaoLogin().catch((err) => {
			console.log(err);
		});
		navigation.navigate('SignUp');
	};

	return (
		<>
			<CustomStatusBar />
			<SafeAreaView style={styles.root}>
				<View style={styles.title}>
					<Image style={styles.titleText} source={textLogo} />
					<View style={styles.titleUnderBar} />
				</View>
				<View style={styles.login}>
					<TouchableOpacity
						style={styles.loginBtn}
						onPress={loginBtnClickListener}>
						<Image style={styles.loginBtn_img} source={kakaoIcon} />
						<Text style={styles.loginBtn_text}>{LOGIN_BUTTON_TEXT}</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</>
	);
}

export default Login;
