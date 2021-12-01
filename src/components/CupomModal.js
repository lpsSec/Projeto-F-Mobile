import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput, Text, StyleSheet } from 'react-native';
import Api from '../Api';
import ExpandIcon from '../assets/expand.svg';
import CupomIcon from '../assets/coupon.svg'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default ({show, setShow, setCupomName, setRefreshCallBack})  =>  {
    const [cupomFiled, setCupomFiled] = useState('');
    const [successApplyed, setSuccessApplyed] = useState('none');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [messageInvalid, setMessageInvalid] = useState('none');
    const [discount, setDiscount] = useState(0);

    const applyCupom = async () => {
        if(cupomFiled == "") {
            setMessageEmpty('flex');
            wait(3000).then(() => { setMessageEmpty('none') });
        } else {
            let response = await Api.validateCupom( cupomFiled );

            if( response._id  != null) {
                setCupomName(response.name);
                setDiscount(response.value);
                setSuccessApplyed('flex');
                wait(2000).then(() => { setSuccessApplyed('none'); setShow(false); setRefreshCallBack(true)});
            }
            else
            {
                setMessageInvalid('flex');
                wait(3000).then(() => { setMessageInvalid('none') });
            }
            
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
                    <View style={styles.couponArea}>
                        <View style={styles.inputArea}>
                            <CupomIcon width="24" height="24" fill="#000000" />
                            <TextInput
                                style={styles.input} 
                                placeholder="Insira um cupom de desconto."
                                placeholderTextColor="#000000"
                                autoCapitalize='none'
                                onChangeText={t=>setCupomFiled(t)}
                            />
                        </View>
                    </View>
                    <View style={styles.messageArea}>
                        <Text style={{ display: messageEmpty, color: '#FF0000', fontSize: 17 }}>
                            Preecha o campo!
                        </Text>
                        <Text style={{ display: messageInvalid, color: '#FF0000', fontSize: 17 }}>
                            O cupom inserido não é valido
                        </Text>
                        <Text style={{ display: successApplyed, color: '#00FF00', fontSize: 17 }}>
                            Cupom de {discount*100}% adicionado!
                        </Text>
                    </View>
                    <View style={styles.confirmArea}>
                        <TouchableOpacity style={styles.appluCoupon} onPress={() => applyCupom()}>
                            <Text style={styles.textConfirm}>Aplicar</Text>
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
    couponArea: {
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
        justifyContent: 'center',
    },
    appluCoupon: {
        width: 300,
        height: 50,
        backgroundColor: '#17F1A1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textConfirm: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000'
    }
});