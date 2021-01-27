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

	const kakaoLogin = async () => {
		return KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
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
	};
	const getProfile = () => {
		KakaoLogins.getProfile()
			.then((result) => {
				setProfile(result);
				console.log(`Get Profile Finished:${JSON.stringify(result)}`);
			})
			.catch((err) => {
				console.log(`Get Profile Failed:${err.code} ${err.message}`);
			});
	};

	return (
		<View>
			<Text>{"한울림 어플리케이션에 온 것을 환영합니다!"}</Text>
			<Button
				title="회원 가입 창 가기"
				onPress={() => navigation.navigate("SignUp",{
					profile,
				})}
			/>
			<Button
				title="카카오 로그인하기"
				onPress={async () => {
					await kakaoLogin();
					getProfile();
				}
				}
			/>
			<Button
				title="카카오 정보확인하기"
				onPress={() => {
					console.log(profile);
				}}
			/>
		</View>
	);
}

export default Initial;
