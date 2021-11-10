import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_API = 'https://projeto-integrado-f.herokuapp.com/';

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
    signIn: async (USR_LOGINNAME, USR_PASSWORD) => {
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({USR_LOGINNAME, USR_PASSWORD})
        });
        const json = await req.json();

        return json;
    },
    signUp: async (USR_NAME, USR_DATEBIRTHDAY, USR_PHONENUMBER, USRDOC_CPFNUMBER, USR_LOGINNAME, USR_PASSWORD) => {
        const req = await fetch(`${BASE_API}/auth/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({USR_NAME, USR_DATEBIRTHDAY, USR_PHONENUMBER, USRDOC_CPFNUMBER, USR_LOGINNAME, USR_PASSWORD})
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
};