import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native';
import Api from '../../Api';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function forInfo() {
    const [listLocate, setListLocate] = useState([]);
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Api.getLocates().then((response) => {
            if(response.data[0] != null) {
                setListLocate(response.data);
                setMessageEmpty('none');
            }
            else {
                setListLocate([]);
                setMessageEmpty('flex');
            }
        }).catch((error) => {
            alert('Erro inesperado, contate o adminstrador');
        });
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const registerProduct = async () => {
        let json = await Api.registerProduct();
        if(json.token == null){
            await AsyncStorage.setItem('token', '');
            navigation.reset({
                routes: [{name: 'SignIn'}]
            });
        } else {
            alert('Não foi possível fazer Logout!');
        }
    };

    useEffect(() => {
        let isFlag = true;
        setListLocate([]);
        Api.getLocates().then((response) => {
            if(isFlag) {
                if(response.data[0] != null) {
                    setListLocate(response.data);
                    setMessageEmpty('none');
                }
                else {
                    setListLocate([]);
                    setMessageEmpty('flex');
                }
            }
        }).catch((error) => {
            alert('Erro inesperado, contate o adminstrador');
        });
        return () => { isFlag = false };
    }, []);
    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF' }} horizontal={true}>
            <View style={styles.pageBody}>
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFFFFF' }} 
                    horizontal={false} 
                    refreshControl={
                        <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh} 
                        />
                    }
                >
                    <View style={styles.container}>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Nome:</Text>
                            {/* <Text style={styles.title}>{name}</Text> */}
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Descrição:</Text>
                            {/* <Text style={styles.title}>{phone}</Text> */}
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Categoria:</Text>
                            {/* <Text style={styles.title}>{birthday}</Text> */}
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Licença:</Text>
                            {/* <Text style={styles.title}>{email}</Text> */}
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Preço:</Text>
                            {/* <Text style={styles.title}>{email}</Text> */}
                        </View>
                        {/* <TouchableOpacity style={styles.passwordButton} onPress={()=>{  }}>
                            <Text style={styles.passwordText}>Alterar senha</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.containerArea}>
                        <View style={styles.signOutArea}>
                            <Text style={styles.signOutText}>Cadastrar</Text>
                            <TouchableOpacity style={{width: 36, height: 36}} onPress={registerProduct}>
                                {/* <LogOut width="36" height="36"/> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF'
    },
    container: {
        width: 400,
        height: 400,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10
    },
    infoPhoto: {
        width: 380,
        height: 70,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 10
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 5
    },
    adminButton: {
        width: 200,
        marginLeft: 20,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    infoBody: {
        width: 350,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    typeTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    title: {
        marginLeft: 10,
        fontSize: 17
    },
    editButton: {
        width: 30,
        height: 30,
        marginLeft: 10
    },
    passwordButton: {
        width: 150,
        height: 40,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#17F1A1'
    },
    passwordText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    containerArea: {
        width: 400,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#FFFFFF'
    },
    signOutArea: {
        width: 150,
        height: 40,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    signOutText: {
        color: '#557EF2',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 30
    }
});