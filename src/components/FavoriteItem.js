import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Favorite from '../assets/favorito.svg';

export default ({data}) => {
    const navigation = useNavigation();

    const handleSaveItem = async () => {
        navigation.navigate('saveItem', {
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
        <TouchableOpacity style={styles.favoriteItem} onPress={handleSaveItem}>
            <Image style={styles.itemPhoto} source={{  }} />
            <View style={styles.viewArea}>
                <View style={styles.itemInfo}>
                    <View style={styles.itemText}>
                        <Text style={styles.title}>{data.name}</Text>
                    </View>
                    <View style={styles.itemFavorite}>
                        <View style={styles.favoriteButton}>
                            <Favorite width="36" height="36" fill="#000000"/>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    favoriteItem: {
        backgroundColor: '#F5F5F5',
        marginBottom: 20,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#000000',
        alignItems: 'center'
    },
    itemPhoto: {
        width: 77,
        height: 77
    },
    viewArea: {
        justifyContent: 'space-around',
        marginLeft: 20,
        width: 250,
        backgroundColor: '#F5F5F5'
    },
    itemInfo: {
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        minHeight: 70,
    },
    itemText: {
        backgroundColor: '#F5F5F5',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 70,
        width: 150
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000'
    },
    itemFavorite: {
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40
    },
    favoriteButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    warningFavorite: {
        width: 250,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});