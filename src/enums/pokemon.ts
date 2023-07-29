import firstGeneration from './pokemonGenerations/firstGeneration';
import secondGeneration from './pokemonGenerations/secondGeneration';
import thirdGeneration from './pokemonGenerations/thirdGeneration';
import fourthGeneration from './pokemonGenerations/fourthGeneration';
import fifthGeneration from './pokemonGenerations/fifthGeneration';
import sixthGeneration from './pokemonGenerations/sixthGeneration';

const pokemon =
    [
        ...firstGeneration,
        ...secondGeneration,
        ...thirdGeneration,
        ...fourthGeneration,
        ...fifthGeneration,
        ...sixthGeneration,
    ];

export default pokemon;