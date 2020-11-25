const axios = require('axios');

export const getAllFood = async() => {
    return await fetch('http://tdtsv.ddns.net:8000/food/getAllFood')
    .then(res => {
        if(res.status === 200){
            return res.json();
        }else{
            return false
        }
    })
};
