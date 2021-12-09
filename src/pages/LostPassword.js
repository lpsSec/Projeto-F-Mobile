import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, KeyboardAvoidingView, Animated } from 'react-native';
import Api from '../Api';

import PasswordModal from '../components/PasswordModal';

import Email from '../assets/email.svg';
import Lock from '../assets/lock.svg';
import Key from '../assets/key.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function LostPassword() {
    const navigation = useNavigation();

    const [displaySuccess, setDisplaySuccess ] = useState('none');
    const [updatePage, setUpdatePage ] = useState(false);
    const [passwordModal, setpasswordModal] = useState(false);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [emailField, setEmailField] = useState('');
    const [codeField, setCodeField] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [messageSuccess, setMessageSuccess] = useState('none');
    const [wrongEmail, setMessageWrongEmail] = useState('none');
    const [wrongCode, setWrongCode] = useState('none');

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 150 }));

    const hideInputs = () => {
        setShowCodeInput(false);
        setUpdatePage(false);
        setDisplaySuccess('flex');
        setCodeField('');
        wait(4500).then(setMessage);
    };

    const setMessage = () => {
        setMessageWrongEmail('none'); 
        setMessageEmpty('none');
        setMessageSuccess('none');
        setWrongCode('none');
        setDisplaySuccess('none');
    };

    const handleAcceptCode = async ( code ) => {
        if( codeField != '' ) {
            let json = await Api.recoverCode( code );
            if( json.message == "Código de Verificação validado com sucesso!" ) {
                setpasswordModal(true);
            } else {
                setWrongCode('flex');
                wait(3000).then(setMessage);
            }
        } else {
            setMessageEmpty('flex');
            wait(3000).then(setMessage);
        }
    };

    const handleSendEmailClick = async () => {
        if(emailField != '' ) {
            let json = await Api.lostPassword(emailField);
            if(json.message == "E-mail enviado com sucesso!") {
                setShowCodeInput(true);

                setDisplaySuccess('flex');
                wait(4500).then(setMessage);
            } else {
                setMessageWrongEmail('flex');
                wait(3000).then(setMessage);
            }

        } else {
            setMessageEmpty('flex');
            wait(3000).then(setMessage);
        }
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
                <Lock width="150" height="150" alignItems='center' fill="#000000"/>
                <Text style={styles.title}>Esqueceu sua senha?</Text>
            </View>
            <Animated.View style={[ styles.pageBody, { transform: [ { translateY: offset.y } ] }]}>
                <View style={styles.inputArea}>
                    <Email width="24" height="24" fill="#000000" />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Insira seu email"
                        placeholderTextColor="#000000"
                        value={emailField}
                        autoCapitalize='none'
                        onChangeText={t=>setEmailField(t)} 
                        onFocus={t=>setMessage()}
                    />
                </View>
                <View style={styles.titleArea}>
                    <Text style={styles.subtitle}>Confirme seu email para enviarmos as instruções.</Text>
                </View>

                { showCodeInput &&
                <View style={styles.inputAreaCode}>
                    <Key width="24" height="24" fill="#000000" />
                    <TextInput 
                        style={styles.inputCode}
                        placeholder="Insira o código"
                        placeholderTextColor="#000000"
                        value={codeField}
                        autoCapitalize='none'
                        onChangeText={t=>setCodeField(t)} 
                        onFocus={t=>setMessage()}
                        maxLength={6}
                        keyboardType='numeric'
                    />
                <TouchableOpacity onPress={ () => { handleAcceptCode(codeField)} } style={styles.acceptCodeBtn}>
                    <Text style={styles.loginText}>Confirmar</Text>
                </TouchableOpacity>
                </View>}

                <View style={styles.emptyEmail}>
                    <Text style={{display: messageEmpty, color: '#FF0000', }}>
                    Preencha o(s) campo(s)!!
                    </Text>
                </View>
                <View style={styles.emptyEmail}>
                    <Text style={{display: wrongCode, color: '#FF0000', }}>
                    Código inválido.
                    </Text>
                </View>
                <View style={styles.emptyEmail}>
                    <Text style={{display: wrongEmail, color: '#FF0000', }}>
                    Não há nenhum usuário cadastrado com esse e-mail
                    </Text>
                </View>
                <View style={styles.msgSuccess}>
                    <Text style={{display: displaySuccess, color: '#09FA09', }}>
                    Email enviado com as instruções! Cole o código enviado por email para recuperar sua senha.
                    </Text>
                </View>
                <View style={styles.msgSuccess}>
                    <Text style={{display: messageSuccess, color: '#09FA09', }}>
                    Senha alterada com sucesso.
                    </Text>
                </View>
                <TouchableOpacity onPress={handleSendEmailClick} style={styles.loginButton}>
                    <Text style={styles.loginText}>Enviar email</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ navigation.navigate('SignUp') }} style={styles.registerButton}>
                    <Text style={styles.registerText}>Ainda não possui uma conta?</Text>
                    <Text style={styles.registerTextBold}>Cadastre-se</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
        <PasswordModal 
                show={passwordModal}
                setShow={setpasswordModal}
                setRefreshCallBack={setUpdatePage}
            />
            {
                updatePage &&
                hideInputs()
            }
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
        height: 200,//250
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
        height: 450,//400
        width: 400,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    titleArea: {
        width: 350,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80,
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
    inputAreaCode: {
        width: 350,//350
        height: 50,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        borderRadius: 10,
        paddingLeft: 15,
        alignItems: 'center',
        borderWidth: 2,
        justifyContent: 'space-between',
        borderColor: '#000000'
    },
    inputCode: {
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
        alignItems: 'center',
        fontWeight: 'bold'
    },
    loginButton: {
        height: 50,
        width: 350,
        backgroundColor: '#0C3654',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    acceptCodeBtn: {
        height: 50,
        width: 100,
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