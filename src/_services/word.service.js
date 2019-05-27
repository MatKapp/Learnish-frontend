import config from 'config';
import { authHeader } from '../_helpers';
import { corsheader } from '../_helpers';

export const wordService = {
    add,
    getAll,
    remove
};

function add(word) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(word)
    };
    return fetch(`${config.apiUrl}/word-bag/` + word.wordsBagId +`/add_word/`, requestOptions).then(handleResponse);
}

function getAll(wordBagId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/word-bag/`+ wordBagId.wordsBagId +`/words`, requestOptions).then(handleResponse);
}

function remove(word){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/word/`+ word.wordId +`/delete`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}