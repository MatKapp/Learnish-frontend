<template>
    <div>
        <p>Your word-bags:</p>
        <ul v-if="wordsBags.items">
            <li v-for="wordsBag in wordsBags.items" :key="wordsBag.id">
                {{wordsBag.id + ' ' + wordsBag.language + ' ' + wordsBag.name}}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            wordsBags: state => state.wordsBags.all
        })
    },
    created () {
        this.getAllWordsBags();
    },
    methods: {
        ...mapActions('wordsBags', {
            getAllWordsBags: 'getAll',
        })
    }
};
</script>