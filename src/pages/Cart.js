import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl} from 'react-native';

import Back from '../assets/back.svg';
import MyCart from '../assets/cart.svg';
import Api from '../Api';

import Produto from '../components/ProductItem';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Home({state}) {
    const navigation = useNavigation();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Api.getProductsOnCart().then((response) => {
            if(response[0] != null) {                
                setList(response);
                setTextEmpty('none');
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
        setList([]);

        const unsubscribe = navigation.addListener('focus', () => {
            Api.getProductsOnCart().then((response) => {
                if(isFlag){
                if(response[0] != null) {
                    setList(response);
                    setTextEmpty('none');
                    setMessageEmpty('none');
                }
                else {
                    setList([]);
                    setMessageEmpty('flex');
                }
            }
            }).catch((err) => {
                // alert('Erro inesperado, contate o adminstrador');
            });
        });
        return () => { isFlag = false, unsubscribe };
    }, [], [navigation]);

    return (
        <View style={styles.background}>
            <View style={styles.header}>
            <TouchableOpacity style={styles.toBack} onPress={()=>{ navigation.navigate('Home') }}>
                <Back width="36" height="36" fill="#000000"/>
            </TouchableOpacity>
            <Text style={styles.title}>Carrinho</Text>
            
            <TouchableOpacity style={styles.toBack} onPress={ ()=> {}}>
                <MyCart width="30" height="30"  alignItems='center' fill="#000000"/>
            </TouchableOpacity>
            </View>
            {/* PRODUCT LIST */}
            <ScrollView 
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFFFFF' }} 
                    horizontal={false} 
                    refreshControl={
                        <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh} 
                        />}>
                    {loading && 
                        <ActivityIndicator size="large" color="#000000"/>
                    }
                    <View style={styles.listArea}>
                        {
                            list.map((item, k) => (
                                <Produto key={k} data={item} />
                            ))
                        }
                    </View>
            </ScrollView>

            {/* FOOTER */}
            <View style={styles.footer}>
                <View style={styles.priceBox}>
                    <Text style={styles.footerText}>Total:</Text>
                    <Text style={styles.footerText}>R$ 0</Text>
                </View>
                <TouchableOpacity style={styles.buttonBuy} onPress={() => {  }}>
                    <Text style={styles.textBuy}>Comprar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    header: {
        height: 80,
        width: 415,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
        paddingTop: 60,
        backgroundColor: '#49B4EF'
    },
    footer: {
        height: 70,
        width: 415,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-around',
        justifyContent: 'space-around',
        paddingTop: 60,
        backgroundColor: '#49B4EF',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    priceBox: {
        height: 70,
        width: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 60,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    buttonBuy: {
        width: 150,
        height: 50,
        backgroundColor: '#000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
        marginLeft: 200
    },
    textBuy: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
        height: 60,
        color: '#FFFFFF'
    },
    footerText: {
        fontSize: 24,
        color: '#000',
        height: 90,
        color: '#FFFFFF',
        marginLeft: 10
    },
    icon: {
        width: 36,
        height: 36,
    },
    listArea: {
        width: 400,
    },
    toBack: {
        width: 36,
        height: 60,
        alignItems: 'center',
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
});