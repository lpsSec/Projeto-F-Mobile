import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import HomeTabBar from '../components/HomeTabBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import appHome from './sub-pages/appHome';

import Softbear from '../assets/logo_softbear.svg';
import Account from '../assets/account.svg';
import MyCart from '../assets/cart.svg';

const Tab = createMaterialTopTabNavigator();

export default function Home({state}) {
    const navigation = useNavigation();

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <Softbear width="36" height="36" style={styles.icon}/>
                <Text style={styles.title}>Softbear</Text>
                <TouchableOpacity style={styles.profile} onPress={ () => { navigation.navigate('Cart') }}>
                    <MyCart width="30" height="30" fill="#000000"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profile} onPress={() => { navigation.navigate('Profile') }}>    
                    <Account width="36" height="36" fill="#000000"/>
                </TouchableOpacity>
            </View>
            <Tab.Navigator tabBar={props=><HomeTabBar {...props} />}>
                <Tab.Screen name="appHome" component={appHome}/>
            </Tab.Navigator>
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
        height: 130,
        width: 415,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
        paddingTop: 60,
        backgroundColor: '#49B4EF'
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold'
    },
    icon: {
        width: 36,
        height: 36,
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
});