import AsyncStorage from '@react-native-async-storage/async-storage';
// const BASE_API = 'http://localhost:3000';
const BASE_API = 'https://projeto-integrado-f.herokuapp.com';

export default {
    checkToken: async (token, user) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({token, user})
        });
        const json = await req.json();
        return json;
    },
    signIn: async (email, password) => {
        const req = await fetch(`${BASE_API}/session/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });
        
        const json = await req.json();
        return json;
    },
    signUp: async (name, last_name, cpf, email, password, phone, birth_date) => {
        const req = await fetch(`${BASE_API}/user/create`, {
            method: "POST",
            headers: {
                // "Accept" : "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, last_name, cpf, email, password, phone, birth_date})
        });
        const json = await req.json();
        return json;
    },
    signOut: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/auth/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();

        return json;
    },
    updateUserInfo: async (name, last_name, email, phone) => {
        const cpf = await AsyncStorage.getItem('cpf');
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/edit/` + cpf, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, last_name, email, phone})
        });
        const json = await req.json();
        return json;
    },
    alterPassword: async (new_password) => {
        const cpf = await AsyncStorage.getItem('cpf');
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/edit/password/` + cpf, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({new_password})
        });
        const json = await req.json();
        return json;
    },
    lostPassword: async (email) => {
        const cpf = await AsyncStorage.getItem('cpf');
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/recover/password/` + cpf, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        });
        const json = await req.json();
        return json;
    },
    getUserByCPF: async () => {
        const cpf = await AsyncStorage.getItem('cpf');
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/get/` + cpf, {
            headers: {
                // "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
    searchProductByCategory: async ( category ) => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/product/filter`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                // "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({category})
        });
        const json = await req.json();
        return json;
    },
    searchProductByString: async ( name ) => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/product/filter`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                // "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({name})
        });
        const json = await req.json();
        return json;
    },
    // getProductsWithFilter: async ( Filters ) => {
    //     const token = await AsyncStorage.getItem('token');

    //     const FilterObject = {
    //         "name": String(Filters.name),
    //         "price": Number(Filters.price),
    //         "category": Number(Filters.category),
    //         "advertiser": String(Filters.advertiser),
    //         "licenseType": Number(Filters.licenseType),
    //         "rating": Number(Filters.rating)
    //     };

    //     const req = await fetch(`${BASE_API}/product/filter`, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //             // "Authorization": 'Baerer ' + token
    //         },
    //         // body: JSON.stringify({name, price})
    //         body: JSON.stringify(FilterObject)
    //     });
    //     const json = await req.json();
    //     return json;
    // },
    getProducts: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/product/`, {
            // headers: {
            //     "Authorization": 'Baerer ' + token
            // }
        });
        // const json = await req.text();
        const json = await req.json();
        return json;
    },
    getProductsOnCart: async () => {
        const token = await AsyncStorage.getItem('token');
        const cpf = await AsyncStorage.getItem('cpf');
        const req = await fetch(`${BASE_API}/user/cart` + cpf, {
            // headers: {
            //     "Authorization": 'Baerer ' + token
            // }
        });
        const json = await req.json();
        return json;
    },
    validaCNPJ: async ( cnpj ) => {
        const req = await fetch(`https://www.receitaws.com.br/v1/cnpj/` + cnpj, {
        });
        const json = await req.json();
        return json;
    },
    verifyFavorite: async (ITEM_ID) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/verifyFavorite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, ITEM_ID})
        });
        const json = await req.json();
        return json;
    },
    addFavorite: async (ITEM_ID) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/addFavorite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, ITEM_ID})
        });
        const json = await req.json();
        return json;
    },
    removeFavorite: async (ITEM_ID) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/removeFavorites`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, ITEM_ID})
        });
        const json = await req.json();
        return json;
    },
    getFavorites: async () => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/getFavorites/` + user, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
};