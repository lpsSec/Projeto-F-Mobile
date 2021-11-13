import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../pages/Preload';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Read from '../pages/Read';
import ProductBoard from '../pages/ProductBoard';
import LostPassword from '../pages/LostPassword';

const Stack = createStackNavigator();

function Routes(){
    return(
        <Stack.Navigator
            initialRouteName="Preload"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Preload" component={Preload} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            {/* <Stack.Screen name="LostPassword" component={LostPassword} /> */}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Read" component={Read} />
            <Stack.Screen name="ProductBoard" component={ProductBoard} />
        </Stack.Navigator>
    );
};

export default Routes;