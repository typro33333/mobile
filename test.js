const axios = require('axios');

const getMoviesFromApi = () => {
    return axios.get('https://reactnative.dev/movies.json')
    .then(res => {
        if(res.status === 200){
            console.log(res.data)
        }
    })
};

getMoviesFromApi().then(res => {
    console.log(res)
})