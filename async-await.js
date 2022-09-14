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

const showFirstEvolution = async() => {
    try {
        // Nossa função getPokemonByTypePromise retornara o resolve e esse resolve ficará salvo na variável pokemonsByType
        const pokemonsByType = await getPokemonByTypePromise('water');
        console.log('Executou a função getPokemonByTypePromise e foi resolvida');

        const pokemonDetail = await getPokemonDetailPromise(pokemonsByType);
        console.log('Executou a função getPokemonDetailPromise e foi resolvida');

        console.log('Esse log só irá aparecer depois da execução das 2 funções');
        console.log('pokemonsByType: ', pokemonsByType);
        console.log('pokemonDetail: ', pokemonDetail);
        // Notem que esse log só aparece depois dos códigos acima serem executados.
        // Isso acontece por conta do Async/Await, com o await nós esperamos a promise ser resolvida ou rejeitada para assim dar seguimento no fluxo do código.
        console.log('Fim da execução');
    } catch (error) {
        // Para captturar o reject das promises basta utilizarmos try/catch
        console.log('Um erro ocorreu.', error);
    }
}

showFirstEvolution();