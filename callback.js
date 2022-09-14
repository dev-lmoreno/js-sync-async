const getPokemonByType = (type, callback) => {
    console.log('Inicio da função getPokemonByType');

    setTimeout(() => {
        // Simulando o tempo de resposta da API
        console.log('Aguardando retorno da API - 2 segundos');

        // Simulando o retorno da API
        // Nesse caso com callback só será retornado após a finalização da função setTimeout
        callback(['Squirtle', 'Wartortle', 'Blastoise']);
    }, 2000);
};

// Função que recebe o nome de um pokemon e um callback
// Após 2 segundos e meio chamamos a função de callback definida na linha 28, onde exibimobos apenas alguns logs
const getPokemonDetail = ((pokemon, callback) => {
    setTimeout(() => {
        callback(`O pokemon ${pokemon} é da primeira geração`);
    }, 2500);
});

// Simulando requisição para API
// Aqui temos um callback sendo passado para a função getPokemonByType onde logamos o retorno da API
const pokemonsByType = getPokemonByType('water', (pokemonsByType) => {
    console.log('Retorno da API: ', pokemonsByType);
    console.log('Chamando a API de detalhes passando o pokemon Squirtle');

    // Chamada da função getPokemonDetail passando o primeiro valor do array retornado e um callback que recebe o retorno da execução da função.
    getPokemonDetail(pokemonsByType[0], (detail) => {
        console.log('Nessa função de callback recebemos o retorno com os detalhes do pokemon');
        console.log('Detalhes (retorno da execução da função getPokemonDetail): ', detail);
    });
});