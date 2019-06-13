<template>
    <div>
        <Slide>
            <a id="home" href="/"> 
                <span>Home</span>  
            </a>
            <a id="manageWordsBag" :href="'/wordsBags/' + this.$route.params.wordsBagId + '/manage'"> 
                <span>Manage wordsBag</span>  
            </a>
        </Slide>
        <div>
            <div class="display-3">Your wordsbags:</div>
            <router-link class="btn btn-outline-success m-2" :to="'/wordsBags/add'">
            Add a new wordsBag
            </router-link>
        </div>
        <div v-if="wordsBags.items">
            <div class="list-group mb-5 mt-4" v-for="wordsBag in wordsBags.items" :key="wordsBag.pk">
                <router-link class="word list-group-item p-3 pl-5 m-2 btn btn-outline-secondary btn-lg" :to="'/words/' + wordsBag.pk">
                  {{' name: ' + wordsBag.name}}
                </router-link>
                <button v-if="wordsBag.name != 'main'" class="btn btn-outline-danger" @click="removeWordsBag({wordsBagId: wordsBag.pk})">
                    Delete wordsBag
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Slide } from 'vue-burger-menu'

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
            removeWordsBag: 'remove',
        })
    },
    components:{
        Slide
    }
};
</script>