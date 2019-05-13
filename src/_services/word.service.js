import config from 'config';
import { authHeader } from '../_helpers';
import { corsheader } from '../_helpers';

export const wordService = {
    add,
    getAll,
    getAllWordBags,
};

function add(word) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(word)
    };

    return fetch(`${config.apiUrl}/word-bag/3/add_word/`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/word-bag/3/words`, requestOptions).then(handleResponse);
}

function getAllWordBags() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...corsheader() }
    };

    return fetch(`${config.apiUrl}/word-bag/1/bags`, requestOptions).then(handleResponse);
}