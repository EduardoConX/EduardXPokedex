import firstGeneration from './pokemonGenerations/firstGeneration';
import secondGeneration from './pokemonGenerations/secondGeneration';
import thirdGeneration from './pokemonGenerations/thirdGeneration';
import fourthGeneration from './pokemonGenerations/fourthGeneration';
import fifthGeneration from './pokemonGenerations/fifthGeneration';

const pokemon =
    [
        ...firstGeneration,
        ...secondGeneration,
        ...thirdGeneration,
        ...fourthGeneration,
        ...fifthGeneration,
    ];

export default pokemon;