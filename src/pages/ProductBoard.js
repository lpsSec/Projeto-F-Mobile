import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Image} from 'react-native';

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
    const [addFavorite, setAddFavorite] = useState('none');
    const [removeFavorite, setRemoveFavorite] = useState('none');
    const [disabledLocate, setDisabledLocate] = useState(false);
    const [licenseType, setLisence] = useState('');
    const [category, setCategory] = useState('');
    const [starsVector, setStars] = useState([]);

    const [productInfo, setProductInfo] = useState({
        _id: route.params._id,
        name: route.params.name,
        description: route.params.description,
        price: route.params.price,
        category: route.params.category,
        advertiser: route.params.advertiser,
        licenseType: route.params.licenseType,
        rating: route.params.rating
    });

    const setMessage = () => {
        setAddFavorite('none');
        setRemoveFavorite('none');
        setDisabledLocate(false);
    };

    const setFavorite = async () => {
        // if(verify) {
        //     let json = await Api.addFavorite();
        //     if(!json.error) {
        //         setVerify(false);
        //         setAddFavorite('flex');
        //         setRemoveFavorite('none');
        //         setDisabledLocate(true);
        //     }
        // } else {
        //     let json = await Api.removeFavorite();
        //     if(!json.error) {
        //         setVerify(true);
        //         setRemoveFavorite('flex');
        //         setAddFavorite('none');
        //         setDisabledLocate(true);
        //     }
        // }
        wait(3000).then(setMessage);
    };

    useEffect(() => {
        let isFlag = true;
        setStars([]);

        // Loop 5 times
        let tempStars = [];
		for (var i = 1; i <= 5; i++) {
			// Set the path to filled stars
			let IconStart = require('../assets/star-filled.png');
			// If ratings is lower, set the path to unfilled stars
			if (!productInfo.rating || i > productInfo.rating) {
				IconStart = require('../assets/star-unfilled.png');
			}
			// Push the Image tag in the stars array
            tempStars.push(<Image key={i} style={styles.image} source={IconStart}/>);
		}
        setStars(tempStars);

        // Colocar em forma de texto o licenseType e a category de acordo com o enum
        if( productInfo.licenseType != 0)
        {
            switch( productInfo.licenseType )
            {
                case 1:
                    setLisence("EULA");
                    break;
                case 2:
                    setLisence("Software Proprietário");
                    break;
                case 3:
                    setLisence("Software Livre");
                    break;
                case 4:
                    setLisence("Software Comercial");
                    break;
                case 5:
                    setLisence("Open Source");
                    break;
                case 6:
                    setLisence("GNU GPL");
                    break;
                case 7:
                    setLisence("Software Gratuito");
                    break;
                default:
                    setLisence("Desconhecida");
            }
        }

        if( productInfo.category != 0)
        {
            switch( productInfo.category )
            {
                case 1:
                    setCategory("Mobile");
                    break;
                case 2:
                    setCategory("Desktop");
                    break;
                case 3:
                    setCategory("Banco de dados");
                    break;
                case 4:
                    setCategory("Backend");
                    break;
                case 5:
                    setCategory("Design");
                    break;
                default:
                    setCategory("Desconhecida");
            }
        }

        // Api.verifyFavorite().then((response) => {
        //     if(isFlag){
        //         if(response.data != 0 ) {
        //             setVerify(false);
        //         } else {
        //             setVerify(true);
        //         }
        //     }
        // }).catch((error) => {
        //     // alert('Erro inesperado, contate o adminstrador');
        // });
        return () => { isFlag = false };
    }, []);

    return (
        <View style={styles.background}>
            <ImageBackground 
            style={styles.photoArea} 
            source={{ uri: 'https://icon-library.com/images/mobile-apps-icon-vector/mobile-apps-icon-vector-24.jpg' }}
            >
               <TouchableOpacity style={styles.toBack} onPress={()=>{ navigation.navigate('Home') }}>
                    <Back width="36" height="36" fill="#FFFFFF"/>
               </TouchableOpacity>
            </ImageBackground>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
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
                    <View style={styles.infoBody}>
                        <Text style={styles.typeTitle}>Licença:</Text>
                        <Text style={styles.title}>{licenseType}</Text>
                    </View>
                    <View style={styles.infoBody}>
                        <Text style={styles.typeTitle}>Categoria:</Text>
                        <Text style={styles.title}>{category}</Text>
                    </View>
                    <View style={styles.infoBodyForDesc}>
                        <Text style={styles.typeTitle}>Descrição:</Text>
                        <Text style={styles.titleDesc}>{productInfo.description}</Text>
                    </View>
                    <View style={styles.infoBody}>
                        <Text style={styles.typeTitle}>Preço:</Text>
                        <Text style={styles.title}>R$ {productInfo.price}</Text>
                    </View>
                    <View style={styles.infoBody}>
                        <Text style={styles.typeTitle}>Avaliação:</Text>
                        { starsVector }
                        <Text style={styles.title}>({productInfo.rating==null?"0":productInfo.rating})</Text>
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
                    {/* TODO: move to cart page - OR - display successful msg*/}
                        <TouchableOpacity style={styles.addToCart} onPress={() => {  }}>
                            <Text style={styles.textLocate}>Adicionar ao carrinho</Text>
                        </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    image: {
        width: 25,
        height: 25
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
        height: 100,
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
    addToCart: {
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