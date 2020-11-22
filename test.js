const axios = require('axios');
var fetch = require("node-fetch");
const getMoviesFromApi = async() => {
    return await fetch('http://25.71.124.112:8000/food/getAllFood',{
        method:"GET"
    })
    .then(async res => {
        if(res.status === 200){
            return await res.json();
        }
    })
};

getMoviesFromApi().then(res => {
    console.log(res)
})