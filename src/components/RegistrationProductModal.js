import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput, Text, StyleSheet, Picker } from 'react-native';
import Api from '../Api';
import ExpandIcon from '../assets/expand.svg';
import Lock from '../assets/lock.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default ({show, setShow})  =>  {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('none');
    const [licenca, setLicenca] = useState('none');
    const [price, setPrice] = useState('');

    const [message, setMessage] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [messageEmpty2, setMessageEmpty2] = useState('none');
    const [messageEmpty3, setMessageEmpty3] = useState('none');
    const [selectedValue, setSelectedValue] = useState("java");

    const RegisterProduct = async () => {
        let json = await Api.createProduct(nome, descricao, categoria, licenca, price);
        if(json.name){
            setShow(false);
        } else {
            alert('Não foi possível efetuar o cadastro!');
        }
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
                                onChangeText={t=>setNome(t)}
                            />
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Descrição:</Text>
                            <TextInput
                                style={styles.input} 
                                placeholder="Digite a descrição aqui"
                                placeholderTextColor="#000000"
                                autoCapitalize='none'
                                onChangeText={t=>setDescricao(t)}
                            />
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Categoria:</Text>
                            <Picker
                                style={{ height: 50, width: 150 }}
                                selectedValue={categoria}
                                onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
                            >
                                <Picker.Item value="1" label="Mobile" />
                                <Picker.Item value="2" label="Web" />
                                <Picker.Item value="3" label="Híbrido" />
                            </Picker>
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Licença:</Text>
                            <Picker
                                style={{ height: 50, width: 220 }}
                                selectedValue={licenca}
                                onValueChange={(itemValue, itemIndex) => setLicenca(itemValue)}
                            >
                                <Picker.Item value="1" label="EULA" />
                                <Picker.Item value="2" label="Software Proprietário" />
                                <Picker.Item value="3" label="Software Livre" />
                                <Picker.Item value="4" label="Software Comercial" />
                                <Picker.Item value="5" label="Open Source" />
                                <Picker.Item value="6" label="GNU GPL" />
                                <Picker.Item value="7" label="Software Gratuito" />
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
                                onChangeText={t=>setPrice(Number.parseInt(t))}
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