import { wordsBagService } from '../_services';
import { words } from './words.module';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        let languageId = localStorage.selectedLanguageId;
        commit('getAllRequest');
        wordsBagService.getAll( )
            .then(
                wordsBags => commit('getAllSuccess', wordsBags),
                error => commit('getAllFailure', error)
            );
    },

    add({ commit }, { name, language }) {``
    wordsBagService.add({name, language})
            .then(
                function(){
                    commit('getAllRequest')
                    wordsBagService.getAll()
                    .then(
                        wordsBags => commit('getAllSuccess', wordsBags),
                        error => commit('getAllFailure', error)
                    );
                }
            );
    },

    remove({ commit }, { wordsBagId }) {``
    wordsBagService.remove({ wordsBagId })
        .then(
            function(){
                commit('getAllRequest')
                wordsBagService.getAll(localStorage.selectedLanguageId)
                .then(
                    wordsBags => commit('getAllSuccess', wordsBags),
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
    getAllSuccess(state, wordsBags) {
        state.all = { items: wordsBags };
    },
    getAllFailure(state, error) {
        state.all = { error };
    }
};

export const wordsBags = {
    namespaced: true,
    state,
    actions,
    mutations
};
