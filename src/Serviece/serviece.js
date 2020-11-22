const axios = require('axios');

export const getAllFood = async() => {
    return await axios.get('http://25.71.124.112:8000/food/getAllFood')
    .then(res => {
        if(res.status === 200){
            console.log(res.data)
            return res.data
        }else{
            return false
        }
    })
};
