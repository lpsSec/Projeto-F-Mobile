import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileTabBar from '../components/ProfileTabBar';
import forInfo from '../pages/sub-pages/forInfo';
import forMyProducts from '../pages/sub-pages/forMyProducts';
import forFavorites from '../pages/sub-pages/forFavorites';
import forMyShopping from '../pages/sub-pages/forMyShopping';
import Back from '../assets/back.svg';

const Tab = createMaterialTopTabNavigator();

export default function Profile() {
    const navigation = useNavigation();

    return(
        <View style={styles.background}>
            <ImageBackground 
            style={styles.photoArea} 
            source={{ uri: 'https://icon-library.com/images/mobile-apps-icon-vector/mobile-apps-icon-vector-24.jpg' }}
            >
                <TouchableOpacity style={styles.toBack} onPress={()=>{ navigation.navigate('Home') }}>
                    <Back width="36" height="36" fill="#000000"/>
                </TouchableOpacity>
            </ImageBackground>
            <Tab.Navigator tabBar={props=><ProfileTabBar {...props} />}>
                <Tab.Screen name="forInfo" component={forInfo}/>
                <Tab.Screen name="forMyProducts" component={forMyProducts}/>
                <Tab.Screen name="forMyShopping" component={forMyShopping}/>
                {/* <Tab.Screen name="forFavorites" component={forFavorites}/> */}
                {/* <Tab.Screen name="forRegistrationProduct" component={forRegistrationProduct}/> */}
            </Tab.Navigator>
        </View>
    );
} 

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    photoArea: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        minWidth: 415,
        paddingTop: 35,
        paddingLeft: 5,
        minHeight: 250
    },
    toBack: {
        width: 36,
        height: 36,
        alignItems: 'center'
    }
});