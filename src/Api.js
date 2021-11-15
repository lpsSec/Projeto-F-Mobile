import AsyncStorage from '@react-native-async-storage/async-storage';
// const BASE_API = 'http://localhost:3000';
const BASE_API = 'https://projeto-integrado-f.herokuapp.com';
// const BASE_API = 'https://project-e-api.herokuapp.com';

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
    signUp: async (name, last_name, cpf, email, passoword, phone, birth_date) => {
        const req = await fetch(`${BASE_API}/user/create`, {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, last_name, cpf, email, passoword, phone, birth_date})
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
    getProducts: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/product/`, {
            // headers: {
            //     "Authorization": 'Baerer ' + token
            // }
        });
        // const json = await req.text();
        const json = await req.json();
        const stringa = json[0].name;
        // alert('REQ: '+stringa);
        return json;
    },
    getUserId: async () => {
        const user = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/user/` + user, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
    verifyFavorite: async (BOOK_ID) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/verifyFavorite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, BOOK_ID})
        });
        const json = await req.json();
        return json;
    },
    addFavorite: async (BOOK_ID) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/addFavorite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, BOOK_ID})
        });
        const json = await req.json();
        return json;
    },
    removeFavorite: async (BOOK_ID) => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const req = await fetch(`${BASE_API}/user/removeFavorites`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({user, BOOK_ID})
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