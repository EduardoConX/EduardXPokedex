import firstGeneration from './pokemonGenerations/firstGeneration';
import secondGeneration from './pokemonGenerations/secondGeneration';
import thirdGeneration from './pokemonGenerations/thirdGeneration';
import fourthGeneration from './pokemonGenerations/fourthGeneration';

const pokemon =
    [
        ...firstGeneration,
        ...secondGeneration,
        ...thirdGeneration,
        ...fourthGeneration
    ];

export default pokemon;