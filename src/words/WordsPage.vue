<template>
    <div class="list-group">
        <div class="mb-5">
            <h3 >Words in the words bag {{this.$route.params.wordsBagId}}:</h3>
            <router-link class="btn btn-outline-secondary d-inline m-2" to='/wordsBags'>
            Wordbags
            </router-link>
            <router-link class="btn btn-outline-success d-inline m-2" :to="'/words/' + this.$route.params.wordsBagId + '/addWord'">
            Add a new word
            </router-link>
        </div>
        <div v-if="words.items">
            <div v-for="word in words.items" :key="word.id">
                  <word-page :word=word :wordsBagId=$route.params.wordsBagId></word-page>
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