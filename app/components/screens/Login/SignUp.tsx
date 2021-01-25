import React from 'react';
import {View, Text, Button} from 'react-native';

function SignUp({navigation}) {
    return (
        <View>
            <Text>{"한울림 어플리케이션에 온 것을 환영합니다!"}</Text>
            <Button
                title="메인 화면 가기"
                onPress={()=>navigation.navigate('ReservationNavigator')}
            />
        </View>
    );
}

export default SignUp;