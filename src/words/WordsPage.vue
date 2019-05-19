<template>
    <div>
        <h3>Words in the words bag {{this.$route.params.wordsBagId}}:</h3>
        <ul v-if="words.items">
            <div v-for="word in words.items" :key="word.id">
                  {{word.spelling + ' ' + word.translation }}
            </div>
        </ul>
        <add-word-page :wordsBagId="1" />
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
        var wordsBagId = 1;
        this.getAllWords({wordsBagId});
    },
    methods: {
        ...mapActions('words', {
            getAllWords: 'getAll',
        })
    },
    components:{
        AddWordPage
    }
};
</script>