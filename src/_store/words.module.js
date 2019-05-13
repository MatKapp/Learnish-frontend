import { wordService } from '../_services';

const state = {
    all: {},
    allWordBags: {},
};

const actions = {
    getAll({ commit }) {
        commit('getAllWordsRequest');

        wordService.getAll()
            .then(
                words => commit('getAllSuccess', words),
                error => commit('getAllFailure', error)
            );
    },

    getAllWordBags({ commit }) {
        commit('getAllWordBagsRequest');

        wordService.getAllWordBags()
            .then(
                wordBags => commit('getAllWordBagsSuccess', words),
                error => commit('getAllWordBagsFailure', error)
            );
    },

    add({ }, { language, spelling, name }) {``

        wordService.add({language, spelling, name})
            .then(
                console.log('osom')
            );
    },
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, words) {
        state.all = { items: words };
    },
    getAllFailure(state, error) {
        state.all = { error };
    }
};

export const words = {
    namespaced: true,
    state,
    actions,
    mutations
};
