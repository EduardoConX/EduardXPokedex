import firstGeneration from './pokemonGenerations/firstGeneration';
import secondGeneration from './pokemonGenerations/secondGeneration';
import thirdGeneration from './pokemonGenerations/thirdGeneration';
import fourthGeneration from './pokemonGenerations/fourthGeneration';
import fifthGeneration from './pokemonGenerations/fifthGeneration';
import sixthGeneration from './pokemonGenerations/sixthGeneration';
import seventhGeneration from './pokemonGenerations/seventhGeneration';

const pokemon =
    [
        ...firstGeneration,
        ...secondGeneration,
        ...thirdGeneration,
        ...fourthGeneration,
        ...fifthGeneration,
        ...sixthGeneration,
        ...seventhGeneration,
    ];

export default pokemon;