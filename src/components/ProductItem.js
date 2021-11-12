import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

export default ({data}) => {
    const navigation = useNavigation();

    const handleProduct = async () => {
        navigation.navigate('LocateBook', {
            BOOK_ID: data.BOOK_ID,
            BOOK_NAME: data.BOOK_NAME,
            BOOK_DESC: data.BOOK_DESC,
            BOOK_STATUS: data.BOOK_STATUS,
            BOOK_AUTHOR: data.BOOK_AUTHOR,
            BOOK_GEN: data.GEN_NOME,
            IMG_PATH: data.IMG_PATH
        });
    };

    return (
        <TouchableOpacity style={styles.bookItem} onPress={handleProduct}>
            <Image style={styles.bookPhoto} source={{ uri: data.IMG_PATH == null ? 'https://png1.12png.com/14/7/21/8ZV1p6UP7y/icon-design-android-electric-blue-azure.jpg' : data.IMG_PATH }} />
            <View style={styles.bookInfo}>
                <Text style={styles.title}>Título: {data.name}</Text>
                <Text style={styles.title}>Preço: {data.price}</Text>
                <Text style={styles.title}>Vendor: {data.advertiser}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    bookItem: {
        backgroundColor: '#F5F5F5',
        marginBottom: 20,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#000000'
    },
    bookPhoto: {
        width: 77,
        height: 77
    },
    bookInfo: {
        justifyContent: 'space-between',
        marginLeft: 20,
        maxWidth: 250
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000000'
    }
});