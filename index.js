const axios = require('axios');

// Exemplo real consumindo uma promise
axios.get("https://pokeapi.co/api/v2/pokemon/squirtle").then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.log(error);
});

// Exemplo real utilizando asyn/await
const getSquirtle = async() => {
    try {
        const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon/squirtle");
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

getSquirtle();