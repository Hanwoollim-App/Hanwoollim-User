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
import color from '../../../utils/constant/common/design/Color';
import LOGIN_BUTTON_TEXT from '../../../utils/constant/login/loginScreen';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/common/design/Responsive';
import CustomStatusBar from '../../common/CustomStatusBar';
import { textLightLogoImage } from '../../../assets';

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
	SignUpText: {
		fontFamily: 'NotoSansKR-bold',
		fontSize: fontPercentage(15),
		marginTop: heightPercentage(28),
		textAlign: 'center',
		color: '#adefd1',
	},
});

function Login() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const loginBtnClickListener = () => {
		navigation.navigate('SignIn');
	};

	const signUp = () => {
		navigation.navigate('SignUp');
	};

	return (
		<>
			<CustomStatusBar />
			<SafeAreaView style={styles.root}>
				<View style={styles.title}>
					<Image source={textLightLogoImage} style={styles.titleText} />
					<View style={styles.titleUnderBar} />
				</View>
				<View style={styles.login}>
					<TouchableOpacity
						style={styles.loginBtn}
						onPress={loginBtnClickListener}>
						<Text style={styles.loginBtn_text}>{LOGIN_BUTTON_TEXT}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={signUp}>
						<Text style={styles.SignUpText}>회원가입</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</>
	);
}

export default Login;
