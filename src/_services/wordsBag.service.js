import config from 'config';
import { authHeader } from '../_helpers';
import { corsheader } from '../_helpers';

export const wordsBagService = {
    getAll,
    add,
    remove
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/word-bag/${localStorage.selectedLanguageId}/bags`, requestOptions).then(handleResponse);
}

function add(wordsBag) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(wordsBag)
    };
    return fetch(`${config.apiUrl}/word-bag/post/`, requestOptions).then(handleResponse);
}

function remove(wordsBag){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/word-bag/`+ wordsBag.wordsBagId +`/delete`, requestOptions).then(handleResponse);
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