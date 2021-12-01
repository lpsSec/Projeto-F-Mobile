import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Animated, StyleSheet, Alert} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import Api from '../Api';

import Back from '../assets/back.svg';
import Lock from '../assets/lock.svg';
import Person from '../assets/person.svg';
import Today from '../assets/today.svg';
import Doc from '../assets/pasta-de-documentos.svg';
import Payment from '../assets/payment.svg';
import Card from '../assets/card.svg';
import Parcela from '../assets/parcela.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function SignUp() {
    const navigation = useNavigation();
    const route = useRoute();

    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [cupom, setCumpo] = useState('');
    const [parcelasField, setParcelas] = useState('1');
    const [nameField, setNameField] = useState('');
    const [ccNumber, setCcNumber] = useState('');
    const [cvvField, setCVV] = useState('');
    const [cpfField, setCpfField] = useState('');
    const [validationFiled, setValidationFiled] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [messageSucess, setMessageSucess] = useState('none');
    const [validateEmpty, setValidateEmpty] = useState('none');
    const [lResult, setlResult] = useState({
        error: '',
        success: true
    });
    const [checkoutInfo, setCheckoutInfo] = useState({
        total: route.params.total,
        subTotal: route.params.subTotal,
        cupom: route.params.cupom
    });

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 150 }));

    const clearResult = () => {
        lResult.error = '';
        lResult.success = true;
    }

    const fieldValidate = async () => {
        clearResult();

        var cur_year = new Date().getFullYear();
        var cur_month = new Date().getMonth();
        var validationyear = validationFiled.split('/').pop();
        var validationmonth = validationFiled.substr(0-2);

        // alert(cur_month.getMonth);
        if(validationyear < cur_year) {
            lResult.error = 'Há problemas com a forma de pagamento!',
            lResult.success = false;
            return lResult;
        }else if(validationmonth < cur_month) {
            lResult.error = 'Há problemas com a forma de pagamento!',
            lResult.success = false;
            return lResult;
        } else if(cvvField.length < 3) {
            lResult.error = 'Há problemas com a forma de pagamento!',
            lResult.success = false;
            return lResult;
        } else if(cpfField.length < 14) {
            lResult.error = 'O CPF foi preenchido incorretamente!',
            lResult.success = false;
            return lResult;
        } else if(parcelasField < 1) {
            lResult.error = 'Você deve realizar o pagamento em pelomenos uma parcela!',
            lResult.success = false;
            return lResult;
        } else if(ccNumber.length < 16) {
            lResult.error = 'Há problemas com a forma de pagamento!',
            lResult.success = false;
            return lResult;
        } else if(cpfField.length == 14 ) {
            var unmasked = cpfField;
            unmasked = unmasked.replace(".", "");
            unmasked = unmasked.replace(".", "");
            unmasked = unmasked.replace("-", "");

            var sum;
            var rest;
            sum = 0;
            if (unmasked == "00000000000" ||
                unmasked == "11111111111" ||
                unmasked == "22222222222" ||
                unmasked == "33333333333" ||
                unmasked == "44444444444" ||
                unmasked == "55555555555" ||
                unmasked == "66666666666" ||
                unmasked == "77777777777" ||
                unmasked == "88888888888" ||
                unmasked == "99999999999" ) 
            {
                lResult.error = 'O CPF é inválido!',
                lResult.success = false;
                return lResult;
            }

            for (let i = 1; i <= 9; i++) {
                sum = sum + parseInt(unmasked.substring(i - 1, i)) * (11 - i);
            }
            rest = (sum * 10) % 11;

            if ((rest == 10) || (rest == 11))  
                rest = 0;

            if (rest != parseInt(unmasked.substring(9, 10)) ) {
                lResult.error = 'O CPF é inválido!',
                lResult.success = false;
                return lResult;
            }

            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum = sum + parseInt(unmasked.substring(i - 1, i)) * (12 - i);
            }
            rest = (sum * 10) % 11;

            if ((rest == 10) || (rest == 11))  
                rest = 0;

            if (rest != parseInt(unmasked.substring(10, 11) ) ) {
                lResult.error = 'O CPF é inválido!',
                lResult.success = false;
                return lResult;
            } 

        }
        
        return lResult;
    };
    
    const setMessage = () => {
        setValidateEmpty('none');
        setMessageEmpty('none');
        setMessageSucess('none');
    };

    const handleCheckout = async () => {
        if( nameField != '' && cpfField != '' && ccNumber != '' && validationFiled != '' && cvvField != '') {
            let result = fieldValidate();
            if((await result).success) {
                Alert.alert(
                    'Finalizar compra?',
                    'Os itens do carrinho serão comprado no valor de: R$ ' + total +
                    cupom!=''?'\n Cupom usado: '+cupom:'',
                    [
                      { text: "Comprar", onPress: () => {
                        // Api.checkPayment().then((response) => {
                        //     if(response.cpf != null) {
                        //         setList([]);
                        //         setTotal(0);
                        //         setSubTotal(0);
                        //         setCupom('');
                        //     }
                        // }).catch((err) => {
                        //     // alert('Erro inesperado, contate o adminstrador');
                        // });
                      }},
                      { text: "Não", onPress: () =>{}}
                    ], 
                    { cancelable: false }
                  )
            }
        }
    };

    useEffect(() => {
        Animated.spring(offset.y, {
            toValue: 0,
            speed: 10,
            bounciness: 20,
            useNativeDriver: true
        }).start();
    }, []);
    return (
        <View style={styles.background}>
            <View style={styles.header}>
            <TouchableOpacity style={styles.toBack} onPress={()=>{ navigation.goBack() }}>
                <Back width="36" height="36" fill="#000000"/>
            </TouchableOpacity>
            <Text style={styles.title}>Finalizar compra</Text>
            
            <TouchableOpacity style={styles.toBack}>
                <Payment width="30" height="30"  alignItems='center' fill="#FF0000"/>
            </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Animated.View style={[ styles.pageBody,  { transform: [ { translateY: offset.y } ] }]}>
                    <View style={styles.inputArea}>
                        <Person width="24" height="24" fill="#000000" />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Nome do titular"
                            placeholderTextColor="#000000"
                            value={nameField}
                            onChangeText={t=>setNameField(t)}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Doc width="24" height="24" fill="#000000" />
                        <TextInputMask
                            type={'cpf'}
                            value={cpfField}
                            placeholder="CPF"
                            placeholderTextColor="#000000"
                            style={styles.TextMasked}
                            onChangeText={t=>setCpfField(t)}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Card width="24" height="24" fill="#000000" />
                        <TextInputMask 
                            type={'credit-card'}
                            options={{
                                obfuscated: false
                            }}
                            placeholder="Número do cartão"
                            style={styles.input} 
                            placeholderTextColor="#000000"
                            value={ccNumber}
                            autoCapitalize='none'
                            onChangeText={t=>setCcNumber(t)}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Today width="24" height="24" fill="#000000" />
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'MM/YYYY'
                            }}
                            placeholder="Data de validade"
                            placeholderTextColor="#000000"
                            value={validationFiled}
                            style={styles.TextMasked}
                            onChangeText={t=>setValidationFiled(t)}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Lock width="24" height="24" fill="#000000" />
                        <TextInput 
                            style={styles.input}
                            keyboardType='numeric'
                            placeholder="CVV"
                            placeholderTextColor="#000000"
                            value={cvvField}
                            autoCapitalize='none'
                            onChangeText={t=>setCVV(t)}
                            maxLength={3}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Parcela width="24" height="24" fill="#000000" />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Parcelas"
                            placeholderTextColor="#000000"
                            value={parcelasField}
                            autoCapitalize='none'
                            onChangeText={t=>setParcelas(t)}
                            maxLength={2}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.messageValid}>
                    <Text style={{display: messageSucess, color: '#00FF00', }}>
                        Compra finalizada! Aproveite seus produtos.
                        </Text>
                        <Text style={{display: messageEmpty, color: '#FF0000', }}>
                        Preencha todos os campos!
                        </Text>
                        <Text style={{display: validateEmpty, color: '#FF0000', }}>
                        {lResult.error}
                        </Text>
                    </View>
                    
                    <View style={styles.totalPay} >
                        <Text style={styles.footerText}>Subtotal: R$ {checkoutInfo.subTotal}</Text>
                        <Text style={styles.footerText}>Cupom: {checkoutInfo.cupom==""?'--':checkoutInfo.cupom}</Text>
                        <Text style={styles.footerText}>Total: R$ {checkoutInfo.total}</Text>
                    </View>

                    <TouchableOpacity onPress={handleCheckout} style={styles.finalizarBtn}>
                        <Text style={styles.finalizarText}>Comprar</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#49B4EF'
    },
    toBack: {
        width: 36,
        height: 60,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 20,
        color: '#000',
        height: 25,
        color: '#FFFFFF',
        marginLeft: 3,
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
    label: {
        margin: 8,
        fontSize: 15,
        fontWeight: 'bold'
    },
    headerBody: {
        height: 200,
        width: 400,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
        height: 60,
        color: '#FFFFFF'
    },
    icon: {
        width: '35%',
        height: 140,
    },
    pageBody: {
        width: 400,
        height: 500,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    inputArea: {
        width: 350,
        height: 45,
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
    TextMasked: {
        flex: 1,
        fontSize: 16,
        color: "#000000",
        marginLeft: 5
    },
    messageValid: {
        width: 350,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalPay: {
        marginRight: 215
    },
    finalizarBtn: {
        height: 50,
        width: 350,
        backgroundColor: '#0C3654',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    finalizarText: {
        fontSize: 18,
        color: '#FFFF',
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