<template>
    <div>
        <p>Your word-bags:</p>
        <ul v-if="wordsBags.items">
            <div v-for="wordsBag in wordsBags.items" :key="wordsBag.pk">
                <router-link tag="button" :to="'/words/' + wordsBag.pk">
                  {{wordsBag.pk + ' ' + wordsBag.language + ' ' + wordsBag.name}}
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