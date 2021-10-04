// the idea is i show this screen once my app is booting up and im figuring out weather use is authenticated or not, this will be super fast chances are we wont even see 

import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from  '../store/actions/auth';

const StartupScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData)
            {
                await dispatch(authActions.setDidTryAL());

                return;
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);

            if(expirationDate <= new Date() || !token || !userId)
            {
                await dispatch(authActions.setDidTryAL());

                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();

            dispatch(authActions.authenticate(userId, token,expirationTime))
        }
        tryLogin();
    },[dispatch])

    return <View style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.blue1} />
    </View>
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default StartupScreen;