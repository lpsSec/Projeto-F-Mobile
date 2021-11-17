import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
import PasswordModal from '../../components/PasswordModal';
import DataModal from '../../components/DataModal';
import Account from '../../assets/account.svg';
import LogOut from '../../assets/logout.svg';
import Edit from '../../assets/edit.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function forInfo() {
    const navigation = useNavigation();
    
    const [refreshing, setRefreshing] = useState(false);
    const [passwordModal, setpasswordModal] = useState(false);
    const [dataModal, setDataModal] = useState(false);

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setpasswordField] = useState('');
    const [telField, setTelField] = useState('');
    const [cpfField, setCPFField] = useState('');
    const [ageField, setAgeField] = useState('');

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Api.getUserByCPF().then((response) => {
            if(response.lenght < 1) {
                alert('Usuário não encontrado');
            }
            else {
                setCPFField(response.cpf);
                setTelField(response.phone);
                setAgeField(response.birth_date);
                setEmailField(response.email);
                setNameField(response.name + " " + response.last_name);
            }
        }).catch((error) => {
            // alert('Erro inesperado, contate o adminstrador');
        });
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const signOut = async () => {
        let json = await Api.signOut();
        if(json.token == null){
            await AsyncStorage.setItem('token', '');
            navigation.reset({
                routes: [{name: 'SignIn'}]
            });
        } else {
            alert('Não foi possível fazer Logout!');
        }
    };

    useEffect(() => {
        let isFlag = true;
        Api.getUserByCPF().then((response) => {
            if(isFlag) {
                if(response.lenght < 1) {
                    alert('Usuário não encontrado');
                }
                else {
                    setCPFField(response.cpf);
                    setTelField(response.phone);
                    setAgeField(response.birth_date);
                    setEmailField(response.email);
                    setNameField(response.name + " " + response.last_name);
                }
            }
        }).catch((error) => {
            // alert('Erro inesperado, contate o adminstrador');
        });
        return () => { isFlag = false };
    }, []);
    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF' }} horizontal={true}>
            <View style={styles.pageBody}>
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFFFFF' }} 
                    horizontal={false} 
                    refreshControl={
                        <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh} 
                        />
                    }
                >
                    <View style={styles.container}>
                    <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Nome:</Text>
                            <Text style={styles.title}>{nameField}</Text>
                            <Text>{"    "}</Text>
                            <Edit width="20" height="20" fill="#000000" onPress={()=> { setDataModal(true)}}/>
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Telefone:</Text>
                            <Text style={styles.title}>{telField}</Text>
                            <Text>{"    "}</Text>
                            <Edit width="20" height="20" fill="#000000" onPress={()=> { setDataModal(true)}}/>
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Email:</Text>
                            <Text style={styles.title}>{emailField}</Text>
                            <Text>{"    "}</Text>
                            <Edit width="20" height="20" fill="#000000" onPress={()=> { setDataModal(true)}}/>
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>CPF:</Text>
                            <Text style={styles.title}>{cpfField}</Text>
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Nascimento:</Text>
                            <Text style={styles.title}>{ageField}</Text>
                        </View>
                        <TouchableOpacity style={styles.passwordButton} onPress={()=>{ setpasswordModal(true) }}>
                            <Text style={styles.passwordText}>Alterar senha</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerArea}>
                        <View style={styles.signOutArea}>
                            <Text style={styles.signOutText}>Deseja sair?</Text>
                            <TouchableOpacity style={{width: 36, height: 36}} onPress={signOut}>
                                <LogOut width="36" height="36"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <PasswordModal 
                show={passwordModal}
                setShow={setpasswordModal}
            />
            <DataModal 
                show={dataModal}
                setShow={setDataModal}
                name={nameField}
                phone={telField}
                email={emailField}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF'
    },
    container: {
        width: 400,
        height: 250,
        alignItems: 'center',
        justifyContent: 'space-around',
        // marginTop: 40
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
        height: 35,
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
        color: '#FF0000',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 5
    }
});