import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, KeyboardAvoidingView, Animated } from 'react-native';
import Api from '../Api';

import Email from '../assets/email.svg';
import Lock from '../assets/lock.svg';

export default function LostPassword() {
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [messageSuccess, setMessageSuccess] = useState('none');

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 150 }));

    const handleSendClick = async () => {
        if(emailField != '' ) {
            let json = await Api.LostPassword(emailField);
            if(json) {
                //TODO: Set Success msg
                setMessageSuccess('flex');
            } else {
                setMessagePassword('flex');
            }

        } else {
            setMessageEmpty('flex');
        }
    }

    function clearMsg(){
    	setMessageEmpty('none');
        setMessageSuccess('none');
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
            {/*TODO: fix icon size */}
                <Lock style={styles.iconBig}/>
                <Text style={styles.title}>Esqueceu sua senha?</Text>
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
                <View style={styles.titleArea}>
                    <Text style={styles.subtitle}>Confirme seu email para enviarmos as instruções.</Text>
                </View>
                <View style={styles.emptyEmail}>
                    <Text style={{display: messageEmpty, color: '#FF0000', }}>
                    Preencha o email!
                    </Text>
                </View>
                <View style={styles.msgSuccess}>
                    <Text style={{display: messageSuccess, color: '#09FA09', }}>
                    Email enviado com as instruções!
                    </Text>
                </View>
                <TouchableOpacity onPress={handleSendClick} style={styles.loginButton}>
                    <Text style={styles.loginText}>Enviar email</Text>
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
    iconBig: {
        width: '60%',
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
        fontSize: 15,
        color: '#FFF',
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
    emptyEmail: {
        width: 350,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    msgSuccess: {
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