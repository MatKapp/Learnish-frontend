<template>
    <div>
        <Slide>
            <a id="home" href="/"> 
                <span>Home</span>  
            </a>
        </Slide>
        <div>
            <div class="display-3">Your word bags:</div>
            <router-link class="btn btn-outline-success m-2" :to="'/wordsBags/add'">
            Add a new word bag
            </router-link>
        </div>
        <div v-if="wordsBags.items">
            <div class="list-group mb-5 mt-4 w-50 mx-auto shadow" v-for="wordsBag in wordsBags.items" :key="wordsBag.pk">
                <router-link class="word list-group-item p-3 pl-5 m-2 btn btn-outline-secondary btn-lg d-inline" :to="'/words/' + wordsBag.pk">
                {{' Name: ' + wordsBag.name}}
                </router-link>
                <div class="float-right">
                    <button v-if="wordsBag.name != 'main'" class=" w-25 btn btn-outline-danger" @click="removeWordsBag({wordsBagId: wordsBag.pk})">
                        Delete 
                    </button>
                 </div>
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