import React, {useEffect, useContext} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import KakaoLogins, {KAKAO_AUTH_TYPES} from "@react-native-seoul/kakao-login";
import color from "./../../../utils/design/Color";
import {TOKEN_EMPTY} from "../../../utils/Login/InitialScreenUtils";
import {LoginContext} from "./../../../App";


const styles = StyleSheet.create({
	rootView: {
		width: "100%",
		height: "100%",
		backgroundColor: color.mainColor,
	},
	titleView: {
		width: "100%",
		height: 51,
		marginTop: 228,
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		width: 261,
		height: "100%",
		fontFamily: "YiSunShinDotumL",
		fontSize: 50,
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: 51,
		letterSpacing: 0,
		textAlign: "left",
		color: "#ffffff",
	},
	titleUnderScore: {
		width: 261,
		height: 3,
		marginTop: 11,
		marginLeft: "auto",
		marginRight: "auto",
		backgroundColor: "#adefd1",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#707070",
	},
	loginView: {
		width: "100%",
		height: 52,
		marginTop: 269,
		justifyContent: "center",
		alignItems: "center",
	},
	loginBtn: {
		width: 212,
		height: "100%",
		borderRadius: 25,
		backgroundColor: color.subColor,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	loginImage: {
		width: 44,
		height: 44,
	},
	loginText: {
		width: 133,
		height: 20,
		fontFamily: "KoreanYNSJG4",
		fontSize: 14,
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: 20,
		letterSpacing: 0,
		color: "#3c1e1e",
	},
});


function Initial({navigation}) {
	const login = useContext(LoginContext);

	useEffect(() => {
		if (!KakaoLogins) {
			console.error("Module is Not Linked");
		}
	});

	const [token, setToken] = login.token;
	const [profile, setProfile] = login.profile;
	const kakaoLogin = async () => {
		return KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
			.then((result) => {
				setToken(result.accessToken);
				return true;
			})
			.catch((err) => {
				if (err.code === "E_CANCELLED_OPERATION") {
					console.log(`Login Cancelled:${err.message}`);
					return false;
				}
				console.log(`Login Failed:${err.code} ${err.message}`);
				return false;
			});
	};
	const getProfile = async () => {
		return KakaoLogins.getProfile()
			.then((result) => {
				setProfile(result);
			})
			.catch((err) => {
				console.log(`Get Profile Failed:${err.code} ${err.message}`);
			});
	};

	return (
		<View style={styles.rootView}>
			<View style={styles.titleView}>
				<Text style={styles.titleText}>{`Hanwoollim`}</Text>
			</View>
			<View style={styles.titleUnderScore} />
			<View style={styles.loginView}>
				<TouchableOpacity
					style={styles.loginBtn}
					title="카카오톡으로 로그인"
					onPress={async () => {
						if (!await kakaoLogin() || token === TOKEN_EMPTY) {
							return;
						}
						await getProfile();
						console.log(profile);
						navigation.navigate("SignUp", {
							profile,
						});
					}}
				>
					<Image
						style={styles.loginImage}
						source={require("../../../assets/images/kakaoLogo.png")}
					/>
					<Text style={styles.loginText}>{`카카오톡으로 로그인`}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Initial;
