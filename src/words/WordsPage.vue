<template>
    <div>
        <h3>Words in the words bag {{this.$route.params.wordsBagId}}:</h3>
        <ul v-if="words.items">
            <div v-for="word in words.items" :key="word.id">
                  {{word.name + ' ' + word.spelling }}
            </div>
        </ul>
        <add-word-page/>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddWordPage from './AddWordPage'

export default {
    computed: {
        ...mapState({
            words: state => state.words.all
        })
    },
    created () {
        this.getAllWords();
    },
    methods: {
        ...mapActions('word', {
            getAllWords: 'getAll',
        })
    },
    components:{
        AddWordPage
    }
};
</script>