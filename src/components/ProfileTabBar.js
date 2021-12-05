import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default ({ state, navigation }) => {
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF' }} horizontal={true}>
                <TouchableOpacity style={styles.buttonPage} onPress={()=>goTo('forInfo')}>
                    <Text style={[styles.textPage, {opacity: state.index===0 ? 1 : 0.5}]}>Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPage} onPress={()=>goTo('forMyProducts')}>
                    <Text style={[styles.textPage, {opacity: state.index===1 ? 1 : 0.5}]}>Meus Produtos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPage} onPress={()=>goTo('forMyShopping')}>
                    <Text style={[styles.textPage, {opacity: state.index===2 ? 1 : 0.5}]}>Minhas Compras</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.buttonPage} onPress={()=>goTo('forFavorites')}>
                    <Text style={[styles.textPage, {opacity: state.index===3 ? 1 : 0.5}]}>Favoritos</Text>
                </TouchableOpacity> */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 60,
        justifyContent: 'space-around', 
        alignItems: 'center', 
        backgroundColor: '#FFFFFF',
        flexDirection: 'row'
    },
    buttonPage: {
        borderBottomWidth: 3,
        borderColor: '#000000',
        borderRadius: 10,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    textPage: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
})