import axios from 'axios';

const instance = axios.create({
    baseUrl: "https://whatsup1clone.herokuapp.com"
});

export default instance;