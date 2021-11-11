import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput, Text, StyleSheet, Picker } from 'react-native';
import Api from '../Api';
import ExpandIcon from '../assets/expand.svg';
import Lock from '../assets/lock.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default ({show, setShow, idUSer})  =>  {
    const [passwordField, setPasswordField] = useState('');
    const [passwordField2, setPasswordField2] = useState('');
    const [message, setMessage] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [messageEmpty2, setMessageEmpty2] = useState('none');
    const [messageEmpty3, setMessageEmpty3] = useState('none');
    const [selectedValue, setSelectedValue] = useState("java");

    const RegisterProduct = async () => {
        // if(passwordField != passwordField2) {
        //     setMessageEmpty('flex');
        //     wait(3000).then(() => { setMessageEmpty('none') });
        // } else if (passwordField.length < 6 || passwordField.length > 10) {
        //     setMessageEmpty2('flex');
        //     wait(3000).then(() => { setMessageEmpty2('none') });
        // } else {
        //     let json = await Api.registerProduct(value, passwordField);
        //     if(!json.error)
        //         setShow(false);
        //     else {
        //         setMessage(json.mensagem);
        //         setMessageEmpty3('flex');
        //         wait(3000).then(() => { setMessageEmpty3('none') });
        //     }
        // }
    };

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
                    <View style={styles.container}>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Nome:</Text>
                            <TextInput
                                style={styles.input} 
                                placeholder="Digite o nome aqui"
                                placeholderTextColor="#000000"
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Descrição:</Text>
                            <TextInput
                                style={styles.input} 
                                placeholder="Digite a descrição aqui"
                                placeholderTextColor="#000000"
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Categoria:</Text>
                            <Picker
                                style={{ height: 50, width: 150 }}
                                selectedValue={selectedValue}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item value="mobile" label="Mobile" />
                                <Picker.Item value="web" label="Web" />
                                <Picker.Item value="hibrido" label="Híbrido" />
                            </Picker>
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Licença:</Text>
                            <Picker
                                style={{ height: 50, width: 220 }}
                                selectedValue={selectedValue}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item value="eula" label="EULA" />
                                <Picker.Item value="sp" label="Software Proprietário" />
                                <Picker.Item value="sl" label="Software Livre" />
                                <Picker.Item value="sc" label="Software Comercial" />
                                <Picker.Item value="op" label="Open Source" />
                                <Picker.Item value="gnu" label="GNU GPL" />
                                <Picker.Item value="sg" label="Software Gratuito" />
                            </Picker>
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Preço:</Text>
                            <TextInput
                                style={styles.input} 
                                placeholder="Digite o preço aqui"
                                placeholderTextColor="#000000"
                                autoCapitalize='none'
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                    <View style={styles.messageArea}>
                        <Text style={{ display: messageEmpty, color: '#FF0000', fontSize: 15 }}>
                            As senhas são diferentes! Tente novamente
                        </Text>
                        <Text style={{ display: messageEmpty2, color: '#FF0000', fontSize: 15 }}>
                            A senha deve ter entre 6 e 10 caracteres!
                        </Text>
                        <Text style={{ display: messageEmpty3, color: '#FF0000', fontSize: 15 }}>
                            {message}
                        </Text>
                    </View>
                    <View style={styles.confirmArea}>
                        <TouchableOpacity style={styles.passwordButton} onPress={RegisterProduct}>
                            <Text style={styles.textPassword}>Cadastrar</Text>
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
        minHeight: 350,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    passwordArea: {
        width: 350,
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-around'
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
    passwordButton: {
        width: 300,
        height: 50,
        backgroundColor: '#17F1A1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPassword: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000'
    },
    //Daq pra baixo copiei da outra page antiga
    pageBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF'
    },
    container: {
        width: 400,
        height: 400,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10
    },
    infoPhoto: {
        width: 380,
        height: 70,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 10
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 5
    },
    adminButton: {
        width: 200,
        marginLeft: 20,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    infoBody: {
        width: 350,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    typeTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    title: {
        marginLeft: 10,
        fontSize: 17
    },
    editButton: {
        width: 30,
        height: 30,
        marginLeft: 10
    },
    passwordButton: {
        width: 150,
        height: 40,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#17F1A1'
    },
    passwordText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    containerArea: {
        width: 400,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#FFFFFF'
    },
    signOutArea: {
        width: 150,
        height: 40,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    signOutText: {
        color: '#557EF2',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 30
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        marginLeft: 5
    }
});