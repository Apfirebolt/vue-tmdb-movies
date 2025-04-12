import axios from 'axios';

let baseURL = 'https://api.themoviedb.org/3/';

const httpClient = axios.create({ baseURL });

export default httpClient;