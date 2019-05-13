<template>
    <div>
        <p>Your word-bags:</p>
        <ul v-if="wordBags.items">
            <li v-for="wordBag in wordBags.items" :key="wordBag.id">
                {{wordBag.id + ' ' + wordBag.language + ' ' + wordBag.name}}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            words: state => state.wordBags.all
        })
    },
    created () {
        this.getAllWordBags();
    },
    methods: {
        ...mapActions('words', {
            getAllWordBags: 'getAllWordBags',
        })
    }
};
</script>