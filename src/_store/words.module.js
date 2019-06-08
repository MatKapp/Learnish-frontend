import { wordService } from '../_services';

const state = {
   all: {},
};

const actions = {
    getAll({ commit }, { wordsBagId }) {
        commit('getAllRequest');
        wordService.getAll({ wordsBagId })
            .then(
                words => commit('getAllSuccess', words),
                error => commit('getAllFailure', error)
            );
    },

    add({ commit }, { spelling, wordsBagId }) {``
        wordService.add({spelling, wordsBagId})
            .then(
                function(){
                    commit('getAllRequest')
                    wordService.getAll({ wordsBagId })
                    .then(
                        words => commit('getAllSuccess', words),
                        error => commit('getAllFailure', error)
                    );
                }
            );
    },

    remove({ commit }, { wordsBagId, wordId }) {``
        wordService.remove({ wordId })
            .then(
                function(){
                    commit('getAllRequest')
                    wordService.getAll({ wordsBagId })
                    .then(
                        words => commit('getAllSuccess', words),
                        error => commit('getAllFailure', error)
                    );
                }
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
