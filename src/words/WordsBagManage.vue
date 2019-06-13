<template>
    <div id='wrapper'>
        <div class="list-group" id="left-list">
        <div class="mb-5 ml-5 mr-5">
            <v-select :options="wordsBags.items" :reduce="item => item.name" label="name" @input="onChange"></v-select>
            <h3 >Words in the selected words bag :</h3>
            <router-link class="btn btn-outline-secondary d-inline m-2" to='/wordsBags'>
            Wordbags
            </router-link>
        </div>
        <div v-if="tempWords">
            <div v-for="word in tempWords" :key="word.id">
                  <word-page :word=word :wordsBagId=$route.params.wordsBagId>
                  </word-page>
                  <button :id=collapse_id(word.pk) @click="move_word">
                          Move word
                  </button>
            </div>
        </div>
    </div>

    <div class="list-group" id="right-list">
        <div class="mb-5 ml-5 mr-5">
            <h3 >Words in the words bag {{this.$route.params.wordsBagId}}:</h3>
        </div>
        <router-link class="btn btn-outline-success d-inline m-2" :to="'/words/' + this.$route.params.wordsBagId + '/addWord'">
            Add a new word
            </router-link>
        <div v-if="words.items">
            <div v-for="word in words.items" :key="word.id">
                <div>
                  <word-page :word=word :wordsBagId=$route.params.wordsBagId></word-page>
                </div>
                <div>
                    <button class="btn btn-outline-danger" @click="removeWord({bag_id: $route.params.wordsBagId, wordsBagId: $route.params.wordsBagId, wordId: word.pk})">
                        Delete word
                    </button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddWordPage from './AddWordPage'
import WordPage from './WordPage'
import vSelect from 'vue-select'
import { wordService, wordsBagService } from '../_services';

export default {
    computed: {
        ...mapState({
            words: state => state.words.all,
            wordsBags: state => state.wordsBags.all
        })
    },
    data () {
        return {
            tempWords: [],
            selectedWordsBagId: 0,
            rightIsMain: false,
            leftIsMain: false,
            wordsBagsLoaded: false,
        }
    },
    created () {
        var wordsBagId = this.$route.params.wordsBagId;
        this.getAllWords({wordsBagId});

        this.getAllWordsBags();
    },
    methods: {
        ...mapActions('words', {
            getAllWords: 'getAll',
            moveWord: 'moveWord',
            removeWord: 'remove',
        }),
        ...mapActions('wordsBags',{
            getAllWordsBags: 'getAll',
        }),
        collapse_id(id){
            return 'move_word_' + id
        },
        move_word(event){
            //replace all non-digits with nothing
            let word_id = event.target.id.replace( /^\D+/g, '');
            console.log(word_id);
            let word_pks = [word_id];
            let bag_to = this.$route.params.wordsBagId;
            let bag_from = this.selectedWordsBagId;
            this.moveWord({bag_from, bag_to, word_pks}).then(
                () => {
                    let wordsBagId = this.$route.params.wordsBagId;
                    this.getAllWords({wordsBagId});
                }
            );
        },
        onChange(val) {
            var selectedWordsBag = this.wordsBags.items.find(
                wordsBag => wordsBag.name == val
            )
            let wordsBagId = selectedWordsBag.pk
            this.selectedWordsBagId = wordsBagId;
            wordService.getAll({ wordsBagId })
            .then((result) => {
                console.log(result);
                this.tempWords = result;                
            });

        },

        // isRightWordsBagMain(){
        //     let wordsBags;
        //     if (!this.wordsBagsLoaded){
        //         wordsBagService.getAll()
        //         .then((result) => {
        //             this.tempWordsBags = result;                
        //         });
        //         this.wordsBagsLoaded = true;
        //         console.log(this.tempWordsBags);
        //     }

        //     var wordsBagId = this.$route.params.wordsBagId;
        //     let selectedWordsBag = this.tempWordsBags.find(
        //         wordsBag => wordsBag.pk == wordsBagId
        //     );

        //     return selectedWordsBag.name == 'main'
        // },
    },
    components:{
        WordPage,
        vSelect
    }
};
</script>

<style>
#wrapper {
    display: flex;
    width: 1000px;
}
#left-list {
    width: 50%;
}
#right-list {
    flex: 1;
    width: 50%;
}
</style>
