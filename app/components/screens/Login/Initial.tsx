import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import KakaoLogins, {KAKAO_AUTH_TYPES} from "@react-native-seoul/kakao-login";
import color from "./../../../utils/design/Color";
import {PROFILE_EMPTY, TOKEN_EMPTY} from "../../../utils/Login/InitialScreenUtils";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
		marginTop : "48.6%",
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
		width: '56.5%',
		height: "26%",
		borderRadius: 60,
		backgroundColor: color.subColor,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	loginImageBox: {
		width: "22%",
		justifyContent: "center",
		alignItems: "flex-end",
	},
	loginImage: {
		width: "70%",
		height:"70%",
	},
	loginTextBox: {
		width: '70.2%',
		justifyContent: "center",
		alignItems: "center",
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

function Initial({navigation}) {
	const [token, setToken] = useState(TOKEN_EMPTY);
	const [profile, setProfile] = useState(PROFILE_EMPTY);

	useEffect(() => {
		if (!KakaoLogins) {
			console.error("Module is Not Linked");
		}
	}, []);
	const kakaoLogin = async () => KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
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
						title="카카오톡으로 로그인"
						style={styles.loginBtn}
						onPress={async () => {
							if (!await kakaoLogin()) {
								return;
							}
							navigation.navigate("SignUp", {
								profile,
							});
						}}
					>
						<View style={styles.loginImageBox}>
							<Image
								style={styles.loginImage}
								source={require("../../../assets/images/kakaoLogo.png")}
							/>
						</View>
						<View style={styles.loginTextBox}>
							<Text style={styles.loginText}>{`카카오톡으로 로그인`}</Text>
						</View>
					</TouchableOpacity>
			</View>
		</View>
	);
}

export default Initial;
