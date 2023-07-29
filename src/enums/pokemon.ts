import firstGeneration from './pokemonGenerations/firstGeneration';
import secondGeneration from './pokemonGenerations/secondGeneration';
import thirdGeneration from './pokemonGenerations/thirdGeneration';

const pokemon =
    [
        ...firstGeneration,
        ...secondGeneration,
        ...thirdGeneration
    ];

export default pokemon;