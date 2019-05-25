<template>
    <div>
        <div>
            <div class="display-3">Your wordsbags:</div>
            <router-link class="btn btn-outline-success m-2" :to="'/word-bag/addWordBag'">
            Add a new wordsBag
            </router-link>
        </div>
        <div v-if="wordsBags.items">
            <div class="list-group" v-for="wordsBag in wordsBags.items" :key="wordsBag.pk">
                <router-link class="word list-group-item p-3 pl-5 m-2 btn btn-outline-secondary btn-lg" :to="'/words/' + wordsBag.pk">
                  {{'language: ' + wordsBag.language + ' name: ' + wordsBag.name}}
                </router-link>
            </div>
        </div>
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