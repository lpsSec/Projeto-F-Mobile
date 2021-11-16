import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, KeyboardAvoidingView, Animated } from 'react-native';
import Api from '../Api';

import Email from '../assets/email.svg';
import Lock from '../assets/lock.svg';

export default function SignIn() {
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setpasswordField] = useState('');
    const [messagePassword, setMessagePassword] = useState('none');
    const [messageEmpty, setMessageEmpty] = useState('none');

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 150 }));

    const handleSignClick = async () => {

        // DEBUG: redirect to HOME screen
        // await AsyncStorage.setItem('cpf', '19233311134');
        // navigation.reset({routes: [{name: 'Home'}]});
        // return;
        if(emailField != '' && passwordField != '') {
            let json = await Api.signIn(emailField, passwordField);
            if(json.token) {
                await AsyncStorage.setItem('token', json.token);
                await AsyncStorage.setItem('cpf', json.cpf);

                navigation.reset({
                    routes: [{name: 'Home'}]
                });

            } else {
                setMessagePassword('flex');
            }

        } else {
            setMessageEmpty('flex');
        }
    }

    function clearMsg(){
    	setMessagePassword('none');
    	setMessageEmpty('none');
    }

    useEffect(() => {
        Animated.spring(offset.y, {
            toValue: 0,
            speed: 10,
            bounciness: 20,
            useNativeDriver: true
        }).start();
    }, []);
    return (
        <KeyboardAvoidingView contentContainerStyle={styles.fixKeyboard} behavior="position" enabled>
        <View style={styles.background}>
            <View style={styles.headerBody}>
                <Text style={styles.title}>Login</Text>
                <Image style={styles.icon} source={require('../assets/user.png')}/>
            </View>
            <Animated.View style={[ styles.pageBody, { transform: [ { translateY: offset.y } ] }]}>
                <View style={styles.inputArea}>
                    <Email width="24" height="24" fill="#000000" />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Email"
                        placeholderTextColor="#000000"
                        value={emailField}
                        autoCapitalize='none'
                        onChangeText={t=>setEmailField(t)} 
                        onFocus={t=>clearMsg()}
                    />
                </View>
                <View style={styles.inputArea}>
                    <Lock width="24" height="24" fill="#000000" />
                    <TextInput
                        style={styles.input} 
                        placeholder="Senha"
                        placeholderTextColor="#000000"
                        value={passwordField}
                        autoCapitalize='none'
                        onChangeText={t=>setpasswordField(t)}
                        onFocus={t=>clearMsg()}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity onPress={ () => navigation.navigate('LostPassword')}>
                    <Text style={styles.subtitle}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
                <View style={styles.wrongPassword}>
                    <Text style={{display: messagePassword, color: '#FF0000'}}>
                    Sua senha/email está incorreta. Por favor tente novamente.
                    </Text>
                    <Text style={{display: messageEmpty, color: '#FF0000', }}>
                    Preencha os campos!
                    </Text>
                </View>
                <TouchableOpacity onPress={handleSignClick} style={styles.loginButton}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ navigation.navigate('SignUp') }} style={styles.registerButton}>
                    <Text style={styles.registerText}>Ainda não possui uma conta?</Text>
                    <Text style={styles.registerTextBold}>Cadastre-se</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    fixKeyboard: {
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        paddingTop: 80,
        alignContent: 'center',
        backgroundColor: '#49B4EF'
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#49B4EF'
    },
    headerBody: {
        height: 250,
        width: 400,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    title: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold'
    },
    icon: {
        width: '35%',
        height: 140,
    },
    pageBody: {
        height: 400,
        width: 400,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    titleArea: {
        width: 350,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subtitle: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    inputArea: {
        width: 350,
        height: 50,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        borderRadius: 10,
        paddingLeft: 15,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000000'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        marginLeft: 5
    },
    wrongPassword: {
        width: 350,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        height: 50,
        width: 350,
        backgroundColor: '#0C3654',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    registerButton: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    registerText: {
        fontSize: 16,
        color: '#000000'
    },
    registerTextBold: {
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
        marginLeft: 5
    }
});