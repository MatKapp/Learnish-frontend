import { wordService } from '../_services';

const state = {
    all: {},
    wordToGuess: {},
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

    getWordToGuess({ commit }, { wordsBagId }) {
        wordService.getWordToGuess({ wordsBagId })
            .then(
                wordToGuess => commit('getWordToGuess', wordToGuess),
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

    reactToGuess({ commit }, { answer, wordId, wordsBagId }) {``
        wordService.reactToGuess({answer, wordId})
            .then(() => {
                wordService.getWordToGuess({ wordsBagId })
                .then(
                    wordToGuess => commit('getWordToGuess', wordToGuess),
                    error => commit('getAllFailure', error)
                );
                }
            );
    },

    moveWord({ commit }, {bag_from, bag_to , word_pks }) {``
    wordService.moveWord({bag_from, bag_to, word_pks})
        .then(
            function(){
                commit('getAllRequest')
                wordService.getAll({ wordsBagId: bag_to })
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
    },
    getWordToGuess(state, word){
        state.wordToGuess = {word: word}
    }
};

export const words = {
    namespaced: true,
    state,
    actions,
    mutations
};
