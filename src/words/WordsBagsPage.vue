<template>
    <div>
        <p>Your word-bags {{this.$route.params.id}}:</p>
        <ul v-if="wordsBags.items">
            <div v-for="wordsBag in wordsBags.items" :key="wordsBag.id">
                <router-link tag="button" to="/wordsBags">
                  {{wordsBag.id + ' ' + wordsBag.language + ' ' + wordsBag.name}}
                </router-link>
            </div>
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