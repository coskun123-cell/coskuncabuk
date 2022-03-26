import axios from 'axios';

const instance = axios.create({
    baseUrl: "http://localhost:9001"
});

export default instance;