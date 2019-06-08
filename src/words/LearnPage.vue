<template>
    <div>
        <div>
            <div>
                <h1 class="display-1">Learnish</h1>
            </div>
            <div>
                <h3>
                    Word bag:
                </h3>
                <v-select :options="wordsBags.items" :reduce="item => item.name" label="name" :value="selectedBag"/>
                <button v-on:click="changeWord">OK</button>
                Word: {{forLearning}}<br>
                Translation <input></input>
            </div>
        </div>
        <div class="m-5">
            <router-link class=" d-inline word list-group-item p-4 m-3 btn btn-outline-secondary btn-lg" to="/login">Logout</router-link>
            <router-link class=" d-inline word list-group-item p-4 m-3 btn btn-outline-secondary btn-lg" to="/wordsBags">WordsBags</router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import vSelect from 'vue-select'
export default {
    computed: {
        ...mapState({
            wordsBags: state => state.wordsBags.all,
            forLearning: state => state.forLearning,
            selectedBag: state => ''
        })
    },
    created () {
        this.getAllWordsBags();
    },
    methods: {
        ...mapActions('wordsBags', {
            getAllWordsBags: 'getAll',
            getForLearning: 'getForLearning'
        }),
        changeWord: function(){
          let x = 8;
          this.getForLearning({x});
          console.log(this.forLearning);
        },
    },
    components: {
        vSelect
    }
};
</script>
