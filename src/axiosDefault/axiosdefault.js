import axios from 'axios';
const BASE_URL = 'http://25.71.124.112:8000';
const URL = axios.create({
    baseURL: BASE_URL,
});

export default URL;