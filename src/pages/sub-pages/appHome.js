import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl, DatePickerAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import Produto from '../../components/ProductItem';
import FabButton from '../../components/FabButton';
import Search from '../../assets/search.svg';
import FilterIcon from '../../assets/filter.svg';
import NotFound from '../../assets/nao-encontrado.svg';

import ModalSelector from 'react-native-modal-selector'
// TODO: fix modal style.3

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function appHome(){
    const navigation = useNavigation();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState(0);
    const [searchFiled, setSearchField] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [searchEmpty, setSearchEmpty] = useState('none');
    const [textEmpty, setTextEmpty] = useState('none');
    const [refreshing, setRefreshing] = useState(false);
    const [displayFilter, setDisplayFilter] = useState(false);

    // Populate Modal Picker
    const categoryData = [
        { key: 1, label: 'MOBILE' },
        { key: 2, label: 'DESKTOP' },
        { key: 3, label: 'BANCO_DE_DADOS' },
        { key: 4, label: 'BACKEND' },
        { key: 5, label: 'DESIGN' }
    ];

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Api.getProducts().then((response) => {
            if(response[0] != null) {                
                setList(response);
                setTextEmpty('none');
                setMessageEmpty('none');
            }
            else {
                setList([]);
                setMessageEmpty('flex');
            }
        }).catch((err) => {
            // alert('Erro inesperado, contate o adminstrador');
        });
        wait(2000).then(() => setRefreshing(false));
    }, []);

    function clearMsg(){
    	setSearchEmpty('none');
        setMessageEmpty('none');
    };

    const handleSearchFilter = async (categoty) => {
        setLoading(true);
        setList([]);
        setCategoryFilter(categoty);
        setSearchEmpty('none');

        if( categoryFilter != 0 )
        {
            let response = await Api.searchProductByCategory(categoryFilter)
            
            if( response[0] != null) {
                setList(response);
                setTextEmpty('none');
                setMessageEmpty('none');
            } else {
                setList([]);
                setMessageEmpty('flex');
            }
        }

        setLoading(false);
    }

    const handleSearch = async () => {
        setLoading(true);
        setList([]);

        // Hardcoded first product
        // const Filters =  {
        //     "name": searchFiled,
        //     "price": 5000,
        //     "category": 1,
        //     "advertiser": "Lourenço",
        //     "licenseType": 1,
        //     "rating": 5
        // };

        if( searchFiled != "")
        {
            let response = await Api.searchProductByString(searchFiled)
            
            if( response[0] != null) {
                setList(response);
                setTextEmpty('none');
                setMessageEmpty('none');
            } else {
                setList([]);
                setMessageEmpty('flex');
            }
        } else {
            setSearchEmpty('flex');
        }
        setLoading(false);
    };

    useEffect(() => {
        let isFlag = true;
        setList([]);
        const unsubscribe = navigation.addListener('focus', () => {
            Api.getProducts().then((response) => {
                if(isFlag){
                if(response[0] != null) {
                    setList(response);
                    setTextEmpty('none');
                    setMessageEmpty('none');
                }
                else {
                    setList([]);
                    setMessageEmpty('flex');
                }
            }
            }).catch((err) => {
                console.log("Erro onRefresh: " + err);
                // alert('Erro inesperado, contate o adminstrador');
            });
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
                    <TouchableOpacity style={styles.search} onPress={() => {setDisplayFilter(true)}}>
                        <FilterIcon width="24" height="24" fill="#000000" />
                    </TouchableOpacity>
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
                        {
                            list.map((item, k) => (
                                <Produto key={k} data={item} removeItem={false} />
                            ))
                        }
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
            {displayFilter &&
                <ModalSelector
                    visible={true}
                    data={categoryData}
                    initValue=""
                    onModalClose={()=>{ setDisplayFilter(false) }}
                    onChange={(option)=>handleSearchFilter(option.key)}
                    />}
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