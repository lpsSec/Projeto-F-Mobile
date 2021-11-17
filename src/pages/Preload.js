import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import Api from '../Api'; 

export default () => {
    const navigation = useNavigation();

    useEffect(()=>{
        //DEBUG: Disable theese lines to check if user is logged in.
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
        return;
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');
            if(token) {
                let json = await Api.checkToken(token, user);
                if(json.token) {
                    await AsyncStorage.setItem('token', json.token);
                                    
                    navigation.reset({
                        routes: [{name: 'Home'}]
                    });
                } else {
                    navigation.reset({
                        routes: [{name: 'SignIn'}]
                    });
                }
            } else {
                navigation.reset({
                    routes: [{name: 'SignIn'}]
                });
            }
        }
        checkToken();
    }, []);

    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={require('../assets/logo.jpg')}/>
            <ActivityIndicator size="large" color="#000000" style={styles.loading}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    loading: {
        marginTop: 10
    },
    icon: {
        width: '35%',
        height: 140
    }
})