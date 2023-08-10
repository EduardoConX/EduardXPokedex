import axios from 'axios';
import { PokemonInfo } from '../interfaces/PokemonInfo';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

export const getPokemonsAPI = async () => {
    return api.get<PokemonInfo[]>('/.json');
}