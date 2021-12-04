import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

import Api from '../Api';

import Minus from '../assets/minus';

export default ({data, removeItem}) => {
    const navigation = useNavigation();

    const handleDeleteProduct = async ( _id ) => {
        let response = await Api.deleteFromCart( _id );

        if( response.cpf != null ) {
            navigation.navigate('Cart',{
                refresh: true
            });
        }
    };

    const handleProduct = async () => {
        navigation.navigate('ProductBoard', {
            _id: data._id,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            advertiser: data.advertiser,
            licenseType: data.licenseType,
            rating: data.rating
        });
    };

    return (
        <TouchableOpacity style={styles.productItem} onPress={handleProduct}>
            <Image style={styles.productPhoto} source={{ uri: 'https://png1.12png.com/14/7/21/8ZV1p6UP7y/icon-design-android-electric-blue-azure.jpg'}} />
            <View style={styles.productInfoRow}>
                <View style={styles.productInfoColumn}>
                    <Text style={styles.title}>Título: {data.name}</Text>
                    <Text style={styles.title}>Fornecedor: {data.advertiser}</Text>
                    <Text style={styles.title}>Preço: {data.price}</Text>
                </View>
                {removeItem &&
                <TouchableOpacity style={styles.deleteBtn} onPress={() => { handleDeleteProduct(data._id)}}>
                    <Minus width="45" height="30" style={styles.minusIcon}/>
                </TouchableOpacity>
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    productItem: {
        backgroundColor: '#F5F5F5',
        marginBottom: 20,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#000000'
    },
    minusIcon: {
        color: '#000000'
    },
    textDeleteItem: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginTop: -15
    },
    deleteBtn: {
        width: 55,
        height: 26,
        backgroundColor: '#FF0000',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    productPhoto: {
        width: 77,
        height: 77
    },
    productInfoRow: {
        justifyContent: 'space-between',
        marginLeft: 20,
        maxWidth: 250,
        flex: 1,
        flexDirection: 'row'
    },
    productInfoColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 5,
        maxWidth: 250,
        flex: 1,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000000'
    }
});