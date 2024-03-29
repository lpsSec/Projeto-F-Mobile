/* NOT IN USE 

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import ProductItem from '../../components/ProductItem';
import FabButton from '../../components/FabButton';
import Search from '../../assets/search.svg';
import NotFound from '../../assets/nao-encontrado.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function appCarrinho() {
    const navigation = useNavigation();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchFiled, setSearchField] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [searchEmpty, setSearchEmpty] = useState('none');
    const [textEmpty, setTextEmpty] = useState('none');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    function clearMsg(){
    	setSearchEmpty('none');
        setMessageEmpty('none');
    }

    const handleSearch = async () => {
        setLoading(true);
        setList([]);

        setLoading(false);
    };

    useEffect(() => {
        let isFlag = true;
        setList([]);
        const unsubscribe = navigation.addListener('focus', () => {
            
        });
        return () => { isFlag = false, unsubscribe };
    }, [], [navigation]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF' }} horizontal={true}>
            <View style={styles.pageBody}>
                <Text style={{display: searchEmpty, color: '#000000', fontWeight: 'bold', marginBottom: 5}}>
                Digite o nome do software que deseja...
                </Text>
                <View style={[styles.inputArea, { display: textEmpty }]}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Pesquise algum software"
                        placeholderTextColor="#000000"
                        value={searchFiled}
                        onChangeText={t=>setSearchField(t)}
                        onFocus={t=>clearMsg()}
                    />
                    <TouchableOpacity style={styles.search} onPress={handleSearch}>
                        <Search width="24" height="24" fill="#000000" />
                    </TouchableOpacity>
                </View>
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
                    {loading && 
                        <ActivityIndicator size="large" color="#000000"/>
                    }
                    <View style={styles.listArea}>
                        {list.map((item, k) => (
                            <ProductItem key={k} data={item} />
                        ))}
                    </View>
                    <View style={[styles.messageNotFound, {display: messageEmpty}]}>
                        <NotFound width="60" height="60" fill="#FFFFFF" />
                        <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 16, marginTop: 10}}>
                        Busca não encontrada
                        </Text>
                    </View>
                </ScrollView>
                <FabButton style={{ bottom: 130, right: 60 }} onPress={()=>{ textEmpty == 'none' ? setTextEmpty('flex') : setTextEmpty('none')}}/>
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
    inputArea: {
        width: 400,
        height: 40,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        borderRadius: 10,
        paddingLeft: 15,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#000000'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        marginLeft: 5
    },
    search: {
        width: 24,
        height: 24,
        marginRight: 10
    },
    listArea: {
        width: 400,
    },
    messageNotFound: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

- NOT IN USE */