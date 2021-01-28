import React, {useState} from "react";
import {View, Text, Button} from "react-native";
import KakaoLogins, {KAKAO_AUTH_TYPES} from "@react-native-seoul/kakao-login";


if (!KakaoLogins) {
	console.error("Module is Not Linked");
}

const TOKEN_EMPTY = "token has not fetched";
const PROFILE_EMPTY = {
	id: "profile has not fetched",
	email: "profile has not fetched",
	profile_image_url: "",
};

function Initial({navigation}) {
	const [token, setToken] = useState(TOKEN_EMPTY);
	const [profile, setProfile] = useState(PROFILE_EMPTY);

	const kakaoLogin = async () => KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
		.then((result) => {
			setToken(result.accessToken);
		})
		.catch((err) => {
			if (err.code === "E_CANCELLED_OPERATION") {
				console.log(`Login Cancelled:${err.message}`);
			} else {
				console.log(`Login Failed:${err.code} ${err.message}`);
			}
		});

	return (
		<View>
			<Text>{`Hanwoollim`}</Text>
			<View/>
			<Button
				title="카카오톡으로 로그인"
				onPress={async () => {
					await kakaoLogin();
					navigation.navigate("SignUp", {
						profile,
					});
				}}
			/>
		</View>
	);
}

export default Initial;
