const axios = require('axios');
var fetch = require("node-fetch");
const getMoviesFromApi = async() => {
    const data = 'abc';
    const data2 = 'cbv';
    return await fetch('http://25.71.124.112:8000/testPost',{
        method:"POST",
        body:JSON.stringify({data,data2})
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