import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

export const getOccurrencesAPI = async () => {
    return api.get<string[]>('/occurrences.json');
}