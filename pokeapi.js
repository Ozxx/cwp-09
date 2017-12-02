const Promise = require('bluebird');
const axios = require('axios');

axios.get('http://pokeapi.co/api/v2/pokemon/42')
    .then(function (response) {
        console.log(`name: ${response.data.name}, weight: ${response.data.weight}, height: ${response.data.height}`);
    });

const pokemonRequests = [];

for (let i = 0; i < 3; i++) {
    pokemonRequests.push(axios.get(`http://pokeapi.co/api/v2/pokemon/?limit=10`));
}

Promise.all(pokemonRequests)
    .then((result) => {
        result.forEach((pack) =>
        {
            pack.data.results.forEach((pokemon) => {
                console.log(`name: ${pokemon.name}`);
                });
            });
        }
    )
    .catch(error => {
        console.log(error);
    });

Promise.any(
    [
    axios.get('http://pokeapi.co/api/v2/pokemon/1'),
    axios.get('http://pokeapi.co/api/v2/pokemon/4'),
    axios.get('http://pokeapi.co/api/v2/pokemon/7'),
    ])
    .then((value) => {
        console.log("Best pokemon :" + value.data.name);
    })
    .catch((error) => {
        console.error(error);
    });

Promise.props({
    pokemons: axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10`),
    items: axios.get(`https://pokeapi.co/api/v2/item/?limit=10`),
    locations: axios.get(`https://pokeapi.co/api/v2/location/?limit=10`)
    })
    .then((result) => {
        result.pokemons.data.results.forEach((prop) => {
            console.log(prop.name);
        })
    })
    .catch((error) => {
        console.error(error);
    });

Promise.map(getDigitsRange(4), (id) => {
    return axios.get(`https://pokeapi.co/api/v2/berry/${id}`);
    })
    .then((result) => {
        result.forEach((val) => {
            console.log(val.data.name);
        });
    });

function getDigitsRange(upTo) {
    const range = [];
    for (let i = 1; i < upTo; i++) {
        range.push(i);
    }
    return range;
}
