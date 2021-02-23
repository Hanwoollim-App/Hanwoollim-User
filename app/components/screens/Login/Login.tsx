import React, {useEffect, useContext} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import KakaoLogins, {KAKAO_AUTH_TYPES} from "@react-native-seoul/kakao-login";
import color from "../../../utils/constant/common/design/Color";
import LoginContext from "../../../utils/context/LoginContext";
import {LOGIN_BUTTON_TEXT, LOGIN_TITLE_TEXT} from "../../../utils/constant/login/LoginScreenUtils";
import {loginInterface, PROFILE_EMPTY, TOKEN_EMPTY} from "../../../utils/constant/login/LoginUtils";
import {fontPercentage, heightPercentage, widthPercentage} from "../../../utils/constant/common/design/Responsive";

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: color.mainColor,
	},
	title: {
		height: heightPercentage(562),
		alignItems: "center",
	},
	title__text: {
		marginTop: heightPercentage(228),
		fontFamily: "YiSunShinDotumL",
		fontSize: fontPercentage(50),
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
	title__underScore: {
		width: widthPercentage(261),
		height: heightPercentage(3),
		marginTop: heightPercentage(11),
		marginLeft: "auto",
		marginRight: "auto",
		backgroundColor: "#adefd1",
		borderStyle: "solid",
		borderWidth: 0.5,
		borderColor: "#707070",
	},
	login: {
		height: heightPercentage(250),
		justifyContent: "flex-start",
		alignItems: "center",
	},
	login__btn: {
		width: widthPercentage(212),
		height: heightPercentage(52),
		borderRadius: 60,
		backgroundColor: color.subColor,
		flexDirection: "row",
		alignItems: "center",
	},
	login__btn__img: {
		width: widthPercentage(44),
		height: heightPercentage(44),
		marginLeft: widthPercentage(14),
	},
	login__btn__text: {
		marginRight: widthPercentage(21),
		fontFamily: "KoreanYNSJG4",
		fontSize: fontPercentage(15),
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		color: "#3c1e1e",
	},
});

function Login({navigation}) {
	const login : loginInterface = useContext(LoginContext);
	const [token, setToken] = login.token;
	const [profile, setProfile] = login.profile;

	useEffect(() => {
		if (!KakaoLogins) {
			console.error("Module is Not Linked");
		}
	}, []);
	useEffect(() => {
		if (token === TOKEN_EMPTY || profile === PROFILE_EMPTY) return;
		navigation.navigate("SignUp");
	}, [token, profile]);

	const kakaoLogin = async () => KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
		.then((result) => {
			setToken(result.accessToken);
			return true;
		})
		.catch((err) => {
			if (err.code === "E_CANCELLED_OPERATION") {
				console.log(`Login Cancelled:${err.message}`);
			}
			console.log(`Login Failed:${err.code} ${err.message}`);
			return false;
		});
	const getProfile = async () => KakaoLogins.getProfile()
		.then((result) => {
			setProfile(result);
		})
		.catch((err) => {
			console.log(`Get Profile Failed:${err.code} ${err.message}`);
		});

	const loginBtnClickListener = async () => {
		if (!await kakaoLogin()) return;
		await getProfile();
	};

	return (
		<View style={styles.root}>
			<View style={styles.title}>
				<Text style={styles.title__text}>{`${LOGIN_TITLE_TEXT}`}</Text>
				<View style={styles.title__underScore}/>
			</View>
			<View style={styles.login}>
				<TouchableOpacity
					style={styles.login__btn}
					onPress={loginBtnClickListener}
				>
					<Image style={styles.login__btn__img}
						source={require("../../../assets/images/kakaoLogo.png")}
					/>
					<Text style={styles.login__btn__text}>{`${LOGIN_BUTTON_TEXT}`}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Login;
