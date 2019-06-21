import { userService } from '../_services';

const state = {
    all: {},
    languages: {},
    selectedLanguage: null
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        userService.getAll()
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            );
    },

    getLanguages({ commit }) {
        commit('getLanguagesRequest');

        userService.getLanguages()
            .then(
                languages => commit('getLanguagesSuccess', languages),
                error => commit('getLanguagesFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        userService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteSuccess', { id, error: error.toString() })
            );
    },

    setLanguageId({ commit }, id) {
        console.log('ustawiam');
        console.log(id);
        commit('setLanguageIdRequest', id);
    },
};

const mutations = {
    setLanguageIdRequest(state, id) {
        state.selectedLanguage = { id: id };
    },
    getLanguagesRequest(state) {
        state.languages = { loading: true };
    },
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        state.all = { items: users };
    },
    getLanguagesSuccess(state, languages) {
        state.languages = { items: languages };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    getLanguagesFailure(state, error) {
        state.languages = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};
