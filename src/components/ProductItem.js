import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

export default ({data}) => {
    const navigation = useNavigation();

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
            <View style={styles.productInfo}>
                <Text style={styles.title}>Título: {data.name}</Text>
                <Text style={styles.title}>Fornecedor: {data.advertiser}</Text>
                <Text style={styles.title}>Preço: {data.price}</Text>
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
    productPhoto: {
        width: 77,
        height: 77
    },
    productInfo: {
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