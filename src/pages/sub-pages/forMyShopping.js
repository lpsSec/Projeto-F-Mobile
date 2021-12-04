import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import NotFound from '../../assets/nao-encontrado.svg';
import Produto from '../../components/ProductItem';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function forMyShopping() {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        
        Api.getProductsOnMyShopping().then((response) => {
            if(response.myShopping != null) {
                setList(response.myShopping);
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
        const unsubscribe = navigation.addListener('focus', () => {
            Api.getProductsOnMyShopping().then((response) => {
                if(isFlag) {
                    if(response.myShopping != null) {
                        setList(response.myShopping);
                        setMessageEmpty('none');
                    }
                    else {
                        setList([]);
                        setMessageEmpty('flex');
                    }
                }
            }).catch((error) => {
                // alert('Erro inesperado, contate o adminstrador');
            });
        });
        Api.getProductsOnMyShopping().then((response) => {
            if(isFlag) {
                if(response.myShopping != null) {
                    setList(response.myShopping);
                    setMessageEmpty('none');
                }
                else {
                    setList([]);
                    setMessageEmpty('flex');
                }
            }
        }).catch((error) => {
            // alert('Erro inesperado, contate o adminstrador');
        });
        return () => { isFlag = false, unsubscribe };
    }, [], [navigation]);
    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF' }} 
        horizontal={true}>
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
                    <View style={[styles.messageNotFound, {display: messageEmpty}]}>
                        <NotFound width="60" height="60" fill="#FFFFFF" />
                        <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 16, marginTop: 10}}>
                        Você não possui produtos comprados!
                        </Text>
                    </View>
                </ScrollView>
            </View>
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
    messageNotFound: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listArea: {
        width: 400,
    },
});