const getPokemonByTypePromise = (type) => {
    // iniciando a Promise
    // resolve - retorno success
    // reject - error
    return new Promise((resolve, reject) => {
        const error = false; // alterar para true para cair no reject

        if (error) {
            reject(new Error(`Ocorreu um erro ao listar os pokemons do tipo ${type}`));
        }

        console.log('Retorno da API caso sucesso');
        resolve(['Squirtle', 'Wartortle', 'Blastoise']);
    })
}

const getPokemonDetailPromise = (pokemon) => {
        return new Promise((resolve, reject) => {
            const error = false; // alterar para true para cair no reject

            if (error) {
                reject(new Error(`Ocorre um erro ao gerar os detalhes do pokemon ${pokemon}`));
            }

            console.log('Retorno da API caso sucesso');
            resolve(`O pokemon ${pokemon} é da primeira geração`);
        });
};

getPokemonByTypePromise('water')
    // chamamos o then caso o fluxo caia no resolve
    // aqui recebemos o retorno do resolve, no caso o array dos pokemons do tipo water
    .then((pokemonsByType) => {
        console.log(`Lista dos pokemons do tipo water: `, pokemonsByType);
        // aqui vamos retornar o resultado da função getPokemonDetailPromise
        return getPokemonDetailPromise(pokemonsByType[0]);
    }).then((detail) => { // nesse then nós temos acesso ao resolve da Promise da função getPokemonDetailPromise
        console.log('Detalhes (retorno da execução da função getPokemonDetailPromise): ', detail);
    })
    // aqui caso o error seja true recebemos o retorno reject, nesse caso a mensagem de erro
    .catch((error) => {
        console.log(error);
    });