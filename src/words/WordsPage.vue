<template>
    <div>
        <p>Words in the words bag {{this.$route.params.wordsBagId}}:</p>
        <ul v-if="words.items">
            <div v-for="word in words.items" :key="word.id">
                  {{word.name + ' ' + word.spelling }}
            </div>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
    }
};
</script>