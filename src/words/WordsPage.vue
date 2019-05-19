<template>
    <div class="list-group">
        <div class="mb-5">
            <h3 class="d-inline">Words in the words bag {{this.$route.params.wordsBagId}}:</h3>
            <router-link class="float-right btn btn-outline-secondary" :to="'/words/' + this.$route.params.wordsBagId + '/addWord'">
            Add new word
            </router-link>
        </div>
        <div v-if="words.items">
            <div v-for="word in words.items" :key="word.id">
                  <word-page :word=word></word-page>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddWordPage from './AddWordPage'
import WordPage from './WordPage'

export default {
    computed: {
        ...mapState({
            words: state => state.words.all
        })
    },
    created () {
        var wordsBagId = this.$route.params.wordsBagId;
        this.getAllWords({wordsBagId});
    },
    methods: {
        ...mapActions('words', {
            getAllWords: 'getAll',
        })
    },
    components:{
        WordPage,
    }
};
</script>