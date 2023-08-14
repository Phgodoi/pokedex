const pokemonName = document.querySelector('.pokemon__name'); //função global  para alterar o nome do pokemon no HTML
const pokemonNumber = document.querySelector('.pokemon__number'); //função global  para alterar o numero do pokemon no html
const pokemonImage = document.querySelector('.pokemon__image'); //Função para alterar a imagem do pokemon no HTML
const pokemonType = document.querySelector('.pokemon__type');
const pokemonHeight = document.querySelector('.value__height')
const pokemonWeight = document.querySelector('.value__Weight');
const pokemonAbilitie = document.querySelector('.value__Abilities');


const form = document.querySelector('.form'); //para fazer a pesquisa do pokemon
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {                                               //cria uma função assincroa
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);   //busca os dados do pokemon no api
   if (APIResponse.status === 200) {

       const data = await APIResponse.json();                                            //converte os resultados para json
       return data;                                                                     //salva os resultados na const data
    }
}

const renderPokemon = async (pokemon) => {                                      //função para renderizar os pokemons 

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['front_default'];
        searchPokemon = data.id;
        
        const types = data.types.map((typeSlot) => typeSlot.type.name);
        pokemonType.innerHTML = types.join(' / '); 

        pokemonHeight.innerHTML = data.height/10 + ' m';
        pokemonWeight.innerHTML = data.weight/10 + ' Kg';

        const abilities = data.abilities.map((ability) => ability.ability.name )
        pokemonAbilitie.innerHTML = abilities.join('\n');
          

    } else {
        pokemonAbilitie.innerHTML = 'Null ';
        pokemonHeight.innerHTML = 'Null ';
        pokemonWeight.innerHTML = 'Null ';
        
        pokemonType.innerHTML = 'Dados não encontrados!';
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado :c';
        pokemonNumber.innerHTML = '';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value ='';
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);