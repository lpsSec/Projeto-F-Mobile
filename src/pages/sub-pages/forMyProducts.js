import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, RefreshControl, TextInput, Picker } from 'react-native';
import RegistrationProductModal from '../../components/RegistrationProductModal';
import NotFound from '../../assets/nao-encontrado.svg';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Produto from '../../components/ProductItem';
import { useNavigation } from '@react-navigation/native';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function forInfo() {
    const navigation = useNavigation();

    const [registrationProductModal, setRegistrationProductModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        const param = "advertiser"
        Api.getProductsWithFilter(param).then((response) => {
            if(response.length != undefined) {
                setList(response);
                setMessageEmpty('none');
            }
            else {
                setList([]);
                setMessageEmpty('flex');
            }
        }).catch((err) => {
            // alert('Erro inesperado, contate o adminstrador');
        });
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        let isFlag = true;
        setMessageEmpty('flex');
        setList([]);
        const param = "advertiser"
        const unsubscribe = navigation.addListener('focus', () => {
            Api.getProductsWithFilter(param).then((response) => {
                
                if(response.length != undefined) {
                    setList(response);
                    setMessageEmpty('none');
                }
                else {
                    setList([]);
                    setMessageEmpty('flex');
                }
            }).catch((err) => {
                // alert('Erro inesperado, contate o adminstrador');
            });
        });
        Api.getProductsWithFilter(param).then((response) => {
            
            if(response.length != undefined) {
                setList(response);
                setMessageEmpty('none');
            }
            else {
                setList([]);
                setMessageEmpty('flex');
            }
        }).catch((err) => {
            // alert('Erro inesperado, contate o adminstrador');
        });
        return () => { isFlag = false, unsubscribe };
    }, [], [navigation]);
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
                    {loading && 
                        <ActivityIndicator size="large" color="#000000"/>
                    }
                    <View style={styles.listArea}>
                        {
                            list.map((item, k) => (
                                <Produto key={k} data={item} removeItem={false} />
                            ))
                        }
                    </View>
                    <View style={styles.container}>
                        <View style={[styles.messageNotFound, {display: messageEmpty}]}>
                            <NotFound width="60" height="60" fill="#FFFFFF" />
                            <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 16, marginTop: 10}}>
                            Você não possui produtos cadastrados!
                            </Text>
                        </View>
                    </View>
                    
                    <TouchableOpacity style={styles.registrationButton} onPress={()=>{ setRegistrationProductModal(true) }}>
                        <Text style={styles.registrationText}>Cadastrar novo</Text>
                    </TouchableOpacity>
                        
                </ScrollView>
            </View>
            <RegistrationProductModal 
                show={registrationProductModal}
                setShow={setRegistrationProductModal}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    listArea: {
        width: 350,
    },
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
    registrationButton: {
        width: 180,
        height: 40,
        borderRadius: 10,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#17F1A1'
    },
    registrationText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        marginLeft: 5
    },
    messageNotFound: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    }
});