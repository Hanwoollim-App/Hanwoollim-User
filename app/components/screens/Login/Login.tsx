import React, {useEffect, useContext} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions} from "react-native";
import KakaoLogins, {KAKAO_AUTH_TYPES} from "@react-native-seoul/kakao-login";
import {RFValue} from "react-native-responsive-fontsize";
import color from "../../../utils/constant/common/design/Color";
import LoginContext from "../../../utils/context/LoginContext";
import {LOGIN_BUTTON_TEXT, LOGIN_TITLE_TEXT} from "../../../utils/constant/login/LoginScreenUtils";
import {loginInterface, PROFILE_EMPTY, TOKEN_EMPTY} from "../../../utils/constant/login/LoginUtils";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: color.mainColor,
	},
	title: {
		width: windowWidth * 1,
		height: windowHeight * 0.692,
		alignItems: "center",
	},
	title__text: {
		marginTop: windowHeight * 0.280,
		fontFamily: "YiSunShinDotumL",
		fontSize: RFValue(47),
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
	title__underScore: {
		width: windowWidth * 0.696,
		height: windowHeight * 0.003,
		marginTop: windowHeight * 0.013,
		marginLeft: "auto",
		marginRight: "auto",
		backgroundColor: "#adefd1",
		borderStyle: "solid",
		borderWidth: 0.5,
		borderColor: "#707070",
	},
	login: {
		width: windowWidth * 1,
		height: windowHeight * 0.318,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	login__btn: {
		width: windowWidth * 0.565,
		height: windowHeight * 0.064,
		borderRadius: 60,
		backgroundColor: color.subColor,
		flexDirection: "row",
		alignItems: "center",
	},
	login__btn__img: {
		width: windowWidth * 0.117,
		height: windowHeight * 0.054,
		marginLeft: windowWidth * 0.037,
	},
	login__btn__text: {
		marginRight: windowWidth * 0.056,
		fontFamily: "KoreanYNSJG4",
		fontSize: RFValue(14),
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
