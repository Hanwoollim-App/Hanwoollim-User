import React, {useEffect, useContext} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import KakaoLogins, {KAKAO_AUTH_TYPES} from "@react-native-seoul/kakao-login";
import {RFValue} from "react-native-responsive-fontsize";
import color from "../../../utils/constant/common/design/Color";
import LoginContext from "../../../utils/context/LoginContext";
import LOGIN_BUTTON_TEXT from "../../../utils/constant/login/InitialScreenUtils";
import {loginInterface, PROFILE_EMPTY, TOKEN_EMPTY} from "../../../utils/constant/login/LoginUtils";

const styles = StyleSheet.create({
	rootView: {
		flex: 1,
		width: "100%",
		height: "100%",
		backgroundColor: color.mainColor,
	},
	titleContainer: {
		flex: 6.9,
		alignItems: "center",
	},
	titleView: {
		width: "100%",
		height: "11%",
		marginTop: "48.6%",
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		flex: 1,
		width: "100%",
		height: "100%",
		fontFamily: "YiSunShinDotumL",
		fontSize: RFValue(47),
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
	titleUnderScore: {
		width: "70%",
		height: "0.6%",
		marginTop: "2%",
		marginLeft: "auto",
		marginRight: "auto",
		backgroundColor: "#adefd1",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#707070",
	},
	loginView: {
		flex: 3.1,
		width: "100%",
		height: "26%",
		marginTop: 0,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	loginBtn: {
		width: "56.5%",
		height: "26%",
		borderRadius: 60,
		backgroundColor: color.subColor,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	loginImage: {
		width: "20.7%",
		height: "84.6%",
		marginLeft: "6%",
	},
	loginText: {
		fontFamily: "KoreanYNSJG4",
		fontSize: RFValue(15),
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

	const loginBtnListener = async () => {
		if (!await kakaoLogin()) return;
		await getProfile();
	};

	return (
		<View style={styles.rootView}>
			<View style={styles.titleContainer}>
				<View style={styles.titleView}>
					<Text style={styles.titleText}>{`Hanwoollim`}</Text>
				</View>
				<View style={styles.titleUnderScore}/>
			</View>
			<View style={styles.loginView}>
				<TouchableOpacity
					style={styles.loginBtn}
					onPress={loginBtnListener}
				>
					<Image
						style={styles.loginImage}
						source={require("../../../assets/images/kakaoLogo.png")}
					/>
					<Text style={styles.loginText}>{`${LOGIN_BUTTON_TEXT}`}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Login;
