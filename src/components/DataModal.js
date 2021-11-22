import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput, Text, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Api from '../Api';
import ExpandIcon from '../assets/expand.svg';

import Person from '../assets/person.svg';
import Email from '../assets/email.svg';
import Tel from '../assets/telefone-celular.svg';
import Doc from '../assets/pasta-de-documentos.svg';
import Today from '../assets/today.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default ({show, setShow, name, phone, email})  =>  {

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [telField, setTelField] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [resultEmpty, setResultEmpty] = useState('none');
    const [lResult, setlResult] = useState({
        error: '',
        success: true
    });

    const clearResult = () => {
        lResult.error = '';
        lResult.success = true;
    };

    const emailValidate = () => {
        var usuario = emailField.substring(0, emailField.indexOf("@"));
        var dominio = emailField.substring(emailField.indexOf("@") + 1, emailField.length);

        if ((usuario.length >= 1) &&
            (dominio.length >= 3) &&
            (usuario.search("@") == -1) &&
            (dominio.search("@") == -1) &&
            (usuario.search(" ") == -1) &&
            (dominio.search(" ") == -1) &&
            (dominio.search(".") != -1) &&
            (dominio.indexOf(".") >= 1) &&
            (dominio.lastIndexOf(".") < dominio.length - 1)) 
        {
            return true;
        } else {
            return false;
        }
    };

    const fieldValidate = () => {
        clearResult();

        const name = nameField.split(' ').slice(0,1).join(' ');
        const last = nameField.split(' ').slice(1,10).join(' ');

        if( !last ) {
            lResult.error = 'Você deve entrar com seu sobrenome também.',
            lResult.success = false;
            return lResult;
        }
        
        if(!emailValidate() && emailField.length != 0) {
            lResult.error = 'O EMAIL é inválido!',
            lResult.success = false;
            return lResult;
        } else if(telField.length < 14 && telField.length != 0) {
            lResult.error = 'O TELEFONE foi preenchido incorretamente!',
            lResult.success = false;
            return lResult;
        }

        return lResult;
    };

    const AlterData = async () => {
        const name = nameField.split(' ').slice(0,1).join(' ');
        const last = nameField.split(' ').slice(1,10).join(' ');
        
        if(emailField == '' && nameField == '' && telField == '') {
            setMessageEmpty('flex');
            wait(2000).then(() => { setMessageEmpty('none') });
        } else {
            let result = fieldValidate();
            if(result.success) {
                let json = await Api.updateUserInfo( name, last, emailField, telField);
                if(!json.error) {
                    setShow(false);
                } else {
                    // alert('Erro inesperado, contate o administrador');
                }
            } else {
                setResultEmpty('flex');
                wait(2000).then(() => { setResultEmpty('none') });
            }
        }
    };

    useEffect(() => {
        let isFlag = true;

        // setNameField(name);
        // setEmailField(email);
        // setTelField(phone);
        
        return () => { isFlag = false };
    }, [] );

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
             <View style={styles.background}>
                <View style={styles.modalBody}>
                    <TouchableOpacity style={{width: 40, height: 40}} onPress={()=>{ setShow(false) }}>
                        <ExpandIcon width="40" height="40" fill="#000000"/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Atualizar dados de cadastro</Text>
                    <View style={styles.inputArea}>
                        <Person width="24" height="24" fill="#000000" />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Digite seu novo nome"
                            placeholderTextColor="#000000"
                            value={nameField}
                            onChangeText={t=>setNameField(t)}
                            onFocus={t=>setNameField("")}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Email width="24" height="24" fill="#000000" />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Digite seu novo e-mail"
                            placeholderTextColor="#000000"
                            value={emailField}
                            autoCapitalize='none'
                            onChangeText={t=>setEmailField(t)}
                            onFocus={t=>setEmailField("")}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Tel width="24" height="24" fill="#000000" />
                        <TextInputMask
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99)'
                            }}
                            placeholder="Digite seu novo telefone"
                            placeholderTextColor="#000000"
                            style={styles.TextMasked}
                            value={telField}
                            onChangeText={t=>setTelField(t)}
                            onFocus={t=>setTelField("")}
                        />
                    </View>
                    <View style={styles.messageArea}>
                        <Text style={{ display: messageEmpty, color: '#FF0000', fontSize: 15 }}>
                            Preencha os campos!
                        </Text>
                        <Text style={{ display: resultEmpty, color: '#FF0000', fontSize: 15 }}>
                            {lResult.error}
                        </Text>
                    </View>
                    <View style={styles.confirmArea}>
                        <TouchableOpacity style={styles.acceptButton} onPress={AlterData}>
                            <Text style={styles.textAccept}>Atualizar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
    },
    modalBody: {
        backgroundColor: '#FFFFFF',
        minHeight: 550,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
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
        borderWidth: 3,
        borderColor: '#000000'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        marginLeft: 5
    },
    TextMasked: {
        flex: 1,
        fontSize: 16,
        color: "#000000",
        marginLeft: 5
    },
    messageArea: {
        width: 350,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmArea: {
        width: 350,
        height: 100,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    acceptButton: {
        width: 300,
        height: 50,
        backgroundColor: '#17F1A1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textAccept: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000'
    }
});