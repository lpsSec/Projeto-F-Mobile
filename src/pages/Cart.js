import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Alert} from 'react-native';

import Back from '../assets/back.svg';
import MyCart from '../assets/cart.svg';
import Trash from '../assets/trash.svg';

import Api from '../Api';

import CupomModal from '../components/CupomModal';
import Produto from '../components/ProductItem';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Cart() {
    const navigation = useNavigation();
    const route = useRoute();

    const [couponModal, setCoupmModal] = useState(false);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [cupom, setCupom] = useState('');
    const [refreshPage, setRefreshPage ] = useState(false);
    const [discount, setDiscount] = useState(0);

    const sendTheBill = async () => {
        navigation.navigate('Checkout',{
            total: total,
            subTotal: subTotal,
            cupom, cupom
        })
    };

    //TODO: use this method to refresh the products on cart when one is deleted.
    const refreshProducts = async (flag) => {
        setList([]);

        Api.getProductsOnCart().then((response) => {
            if(response.productsInCart != null) {
                setList(response.productsInCart);
            }
            else {
                setList([]);
            }
        }).catch((err) => {
            // alert('Erro inesperado, contate o adminstrador');
        });
    };

    const clearCart = async () => {
        Alert.alert(
            'Limpar carrinho?',
            'Todos os item presentes no carrinho serão removidos.',
            [
              { text: "Sim", onPress: () => {
                Api.deleteAllCart().then((response) => {
                    if(response.cpf != null) {
                        setList([]);
                        setTotal(0);
                        setSubTotal(0);
                        setCupom('');
                    }
                }).catch((err) => {
                    // alert('Erro inesperado, contate o adminstrador');
                });
              }},
              { text: "Não", onPress: () =>{}}
            ], 
            { cancelable: false }
          )
    };

    const refreshTotalPrice = async (cupom) => {
        setRefreshPage(false);

        Api.calculateCart(cupom).then((response) => {
            if(response != null) {
                setTotal(response.total);
                setSubTotal(response.subTotal);

                if( response.discountValue != null)
                {
                    setDiscount(response.discountValue);
                }
            }
        }).catch((err) => {
            // alert('Erro inesperado, contate o adminstrador');
        });
    };

    const onRefresh = React.useCallback( async () => {
        setRefreshing(true);
        setRefreshPage(false);

        Api.getProductsOnCart().then((response) => {
            if(response.productsInCart != null) {
                setList(response.productsInCart);
            }
            else {
                setList([]);
            }
        }).catch((err) => {
            // alert('Erro inesperado, contate o adminstrador');
        });
        Api.calculateCart(cupom).then((response) => {
            if(response != null) {
                setTotal(response.total);
                setSubTotal(response.subTotal);

                if( response.discountValue != null)
                {
                    setDiscount(response.discountValue);
                }
            }
        }).catch((err) => {
            // alert('Erro inesperado, contate o adminstrador');
        });

        wait(2000).then(() => setRefreshing(false));
    }, []);

    const refreshCart = () => {
        onRefresh();

        route.params.refresh = false;
    };

    if( route.params?.refresh )
    {
        refreshCart();
    }

    useEffect(() => {
        let isFlag = true;
        setList([]);
        setTotal(0);
        setSubTotal(0);
        setCupom('');

        const unsubscribe = navigation.addListener('focus', () => {

            Api.getProductsOnCart().then((response) => {
                if(isFlag){
                if(response.productsInCart != null) {
                    setList(response.productsInCart);
                }
                else {
                    setList([]);
                }
            }
            }).catch((err) => {
                // alert('Erro inesperado, contate o adminstrador');
            });
            Api.calculateCart(cupom).then((response) => {
                if(isFlag){
                if(response != null) {
                    setTotal(response.total);
                    setSubTotal(response.subTotal);

                    if( response.discountValue != null)
                    {
                        setDiscount(response.discountValue);
                    }
                }
                else {
                    setList([]);
                }
            }
            }).catch((err) => {
                // alert('Erro inesperado, contate o adminstrador');
            });
        });
        return () => { isFlag = false, unsubscribe};
    }, [], [navigation]);

    return (
        <View style={styles.background}>
            <View style={styles.header}>
            <TouchableOpacity style={styles.toBack} onPress={()=>{ navigation.navigate('Home') }}>
                <Back width="36" height="36" fill="#000000"/>
            </TouchableOpacity>
            <Text style={styles.title}>Carrinho</Text>
            
            <TouchableOpacity style={styles.toBack} onPress={ ()=> { clearCart() }}>
                <Trash width="30" height="30"  alignItems='center' fill="#FF0000"/>
            </TouchableOpacity>
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
                        />}
            >
                    {loading && 
                        <ActivityIndicator size="large" color="#000000"/>
                    }
                    <View style={styles.listArea}>
                        {
                            list.map((item, k) => (
                                <Produto key={k} data={item} removeItem={true} />
                            ))
                        }
                    </View>
            </ScrollView>

            {/* FOOTER */}
            <View style={styles.footer}>
            <View style={styles.columnPrice}>
                    <Text style={styles.footerText}>Subtotal: R$ {subTotal}</Text>
                    <Text style={styles.footerText}>Cupom: {cupom==""?'--':cupom}</Text>
                    <Text style={styles.footerText}>Total: R$ {total}</Text>
            </View>
            <View style={styles.columnBtn}>
                <TouchableOpacity style={styles.buttonBuy} onPress={() => { sendTheBill() }}>
                    <Text style={styles.textBuy}>Continuar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBuy} onPress={() => { setCoupmModal(true) }}>
                    <Text style={styles.textBuy}>+ Cupom</Text>
                </TouchableOpacity>
            </View>
            </View>
            <CupomModal 
                    show={couponModal}
                    setShow={setCoupmModal}
                    setCupomName={setCupom}
                    setRefreshCallBack={setRefreshPage}
                />
                {
                    refreshPage &&
                    refreshTotalPrice(cupom)
                }
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
        height: 95,
        width: 420,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 60,
        backgroundColor: '#49B4EF',
        position: 'absolute',
        flex: 1,
        left: 0,
        right: 0,
        bottom: 0,
    },
    columnPrice: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: 200,
        flex: 1,
        width: 300,
        justifyContent: 'space-between',
        bottom: 35
    },
    columnBtn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: 140,
        flex: 1,
        // width: 300,
        bottom: 35,
        marginLeft: 10
    },
    buttonBuy: {
        width: 120,
        height: 40,
        backgroundColor: '#000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 9,
        marginBottom: -2,
        marginLeft: 0
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
        fontSize: 20,
        color: '#000',
        height: 25,
        color: '#FFFFFF',
        marginLeft: 3,
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