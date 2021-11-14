import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import Api from '../Api';

import Back from '../assets/back.svg';
import FavoriteClean from '../assets/favorito-vazio.svg';
import Favorite from '../assets/favorito.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ProductBoard() {
    const navigation = useNavigation();
    const route = useRoute();

    const [verify, setVerify] = useState(true);
    const [indie, setIndie] = useState(true);
    const [loading, setLoading] = useState(false);
    const [addFavorite, setAddFavorite] = useState('none');
    const [removeFavorite, setRemoveFavorite] = useState('none');
    const [disabledBack, setDisabledBack] = useState(false);
    const [disabledLocate, setDisabledLocate] = useState(false);

    // const [bookInfo, setBookInfo] = useState({
    //     BOOK_ID: route.params.BOOK_ID,
    //     BOOK_NAME: route.params.BOOK_NAME,
    //     BOOK_DESC: route.params.BOOK_DESC,
    //     BOOK_STATUS: route.params.BOOK_STATUS,
    //     BOOK_AUTHOR: route.params.BOOK_AUTHOR,
    //     BOOK_GEN: route.params.BOOK_GEN,
    //     IMG_PATH: route.params.IMG_PATH
    // });
    const [productInfo, setProductInfo] = useState({
        _id: route.params._id,
        name: route.params.name,
        description: route.params.description,
        price: route.params.price,
        advertiser: route.params.advertiser,
        licenseType: route.params.licenseType,
        rating: route.params.rating
    });

    const setMessage = () => {
        setLoading(false);
        setAddFavorite('none');
        setRemoveFavorite('none');
        setDisabledBack(false);
        setDisabledLocate(false);
    };

    const setFavorite = async () => {
        setLoading(true);
        // if(verify) {
        //     let json = await Api.addFavorite(bookInfo.BOOK_ID);
        //     if(!json.error) {
        //         setVerify(false);
        //         setAddFavorite('flex');
        //         setRemoveFavorite('none');
        //         setDisabledBack(true);
        //         setDisabledLocate(true);
        //     }
        // } else {
        //     let json = await Api.removeFavorite(bookInfo.BOOK_ID);
        //     if(!json.error) {
        //         setVerify(true);
        //         setRemoveFavorite('flex');
        //         setAddFavorite('none');
        //         setDisabledBack(true);
        //         setDisabledLocate(true);
        //     }
        // }
        wait(3000).then(setMessage);
    };

    // useEffect(() => {
    //     let isFlag = true;
    //     Api.verifyFavorite(bookInfo.BOOK_ID).then((response) => {
    //         if(isFlag){
    //             if(response.data != 0 ) {
    //                 setVerify(false);
    //             } else {
    //                 setVerify(true);
    //             }
    //         }
    //     }).catch((error) => {
    //         // alert('Erro inesperado, contate o adminstrador');
    //     });
    //     return () => { isFlag = false };
    // }, []);

    return (
        <View style={styles.background}>
            <ImageBackground 
            style={styles.photoArea} 
            source={{ uri: 'https://icon-library.com/images/mobile-apps-icon-vector/mobile-apps-icon-vector-24.jpg' }}
            >
               <TouchableOpacity style={styles.toBack} onPress={()=>{ navigation.navigate('Home') }} disabled={disabledBack}>
                    <Back width="36" height="36" fill="#FFFFFF"/>
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.pageBody}>
                <View style={styles.infoProcut}>
                    <Text style={styles.titleProduct}>{productInfo.name}</Text>
                    <View style={styles.infoBody}>
                        <Text style={styles.typeTitle}>Título:</Text>
                        <Text style={styles.title}>{productInfo.name}</Text>
                    </View>
                    <View style={styles.infoBody}>
                        <Text style={styles.typeTitle}>Fornecedor:</Text>
                        <Text style={styles.title}>{productInfo.advertiser}</Text>
                    </View>
                    <View style={styles.infoBodyForDesc}>
                        <Text style={styles.typeTitle}>Descrição:</Text>
                        <Text style={styles.titleDesc}>{productInfo.description}</Text>
                    </View>
                    <View style={styles.infoBodyForDesc}>
                        <Text style={styles.typeTitle}>Preço:</Text>
                        <Text style={styles.titleDesc}>{productInfo.price}</Text>
                    </View>
                </View>
                <View style={styles.warningFavorite}>
                    <Text style={{display: addFavorite, color: '#FF0000'}}>
                    Produto adicionado aos favoritos!
                    </Text>
                    <Text style={{display: removeFavorite, color: '#FF0000', }}>
                    Produto removido dos favoritos!
                    </Text>
                </View>
                <View style={styles.viewCarrinho}>
                    {verify ?
                        <TouchableOpacity style={styles.favoriteButton} onPress={setFavorite} disabled={disabledLocate}>
                            <FavoriteClean width="36" height="36" fill="#000000"/>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.favoriteButton} onPress={setFavorite} disabled={disabledLocate}>
                            <Favorite width="36" height="36" fill="#000000"/>
                        </TouchableOpacity>
                    }
                        <TouchableOpacity style={styles.locateButton} onPress={() => {  }}>
                            <Text style={styles.textLocate}>Adicionar ao carrinho</Text>
                        </TouchableOpacity>             
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
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
    },
    pageBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF'
    },
    infoProcut: {
        width: 400,
        height: 400,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF'
    },
    infoBody: {
        width: 350,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    infoBodyForDesc: {
        width: 350,
        height: 200,
        marginTop: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    warningFavorite: {
        width: 350,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleDesc: {
        marginTop: 10,
        fontSize: 17
    },
    titleProduct: {
        fontWeight: 'bold',
        fontSize: 24
    },
    typeTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    title: {
        marginLeft: 10,
        fontSize: 17
    },
    viewCarrinho: {
        width: 380,
        height: 80,
        marginBottom: 20,
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    favoriteButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    locateButton: {
        width: 300,
        height: 50,
        backgroundColor: '#17F1A1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLocate: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000'
    }
});