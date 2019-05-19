<template>
    <div class="list-group">
        <h3>Words in the words bag {{this.$route.params.wordsBagId}}:</h3>
        <div v-if="words.items">
            <div v-for="word in words.items" :key="word.id">
                  <word-page :word=word></word-page>
            </div>
        </div>
        <add-word-page :wordsBagId="1" />
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
        var wordsBagId = 1;
        this.getAllWords({wordsBagId});
    },
    methods: {
        ...mapActions('words', {
            getAllWords: 'getAll',
        })
    },
    components:{
        AddWordPage,
        WordPage,
    }
};
</script>