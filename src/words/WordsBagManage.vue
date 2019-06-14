<template>
    <div id='wrapper'>
        <Slide>
            <a id="home" href="/"> 
                <span>Home</span>  
            </a>
            <a id="home" href="/wordsBags"> 
                <span>Word bags</span>  
            </a>
        </Slide>
        <div class="list-group" id="left-list">
        <div class="mb-5 ml-5 mr-5">
            <h3 >Select source word bag:</h3>
            <div class="float-left w-50">
                <v-select :options="wordsBags.items" :reduce="item => item.name" label="name" @input="onChange"></v-select>
            </div>
        </div>
        <div v-if="tempWords">
            <div v-for="word in tempWords" :key="word.id">
                  <word-page :word=word withTranslation='true' :wordsBagId=$route.params.wordsBagId>
                  </word-page>
                  <button class="btn btn-outline-secondary d-inline m-2" :id=collapse_id(word.pk) @click="move_word">
                          Move word
                  </button>
            </div>
        </div>
    </div>

    <div class="list-group" id="right-list">
        <div class="mb-5 ml-5 mr-5 d-inline">
            <h3 >Select target word bag:</h3>
            <div>
                <div class="float-left w-50">
                    <v-select :options="wordsBags.items" :reduce="item => item.name" label="name" @input="onChangeRight"></v-select>
                </div>
                <div class="d-inline w-auto">
                    <router-link class="btn btn-outline-success d-inline m-2" :to="'/words/' + this.$route.params.wordsBagId + '/addWord'">
                        Add word
                    </router-link>
                </div>
            </div>
        </div>

        <div v-if="words.items">
            <div v-for="word in words.items" :key="word.id">
                <div>
                  <word-page :word=word withTranslation='true' :wordsBagId=$route.params.wordsBagId></word-page>
                </div>
                <div>
                    <button class="btn btn-outline-danger d-inline m-2" @click="removeWord({bag_id: $route.params.wordsBagId, wordsBagId: $route.params.wordsBagId, wordId: word.pk})">
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
import { Slide } from 'vue-burger-menu'


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
            rightWordsBag: 0,
        }
    },
    created () {
        var wordsBagId = this.rightWordsBag;
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
            let bag_to = this.rightWordsBag;
            let bag_from = this.selectedWordsBagId;
            this.moveWord({bag_from, bag_to, word_pks}).then(
                () => {
                    let wordsBagId = this.rightWordsBag;
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
        onChangeRight(val) {
            var selectedWordsBag = this.wordsBags.items.find(
                wordsBag => wordsBag.name == val
            )
            let wordsBagId = selectedWordsBag.pk
            this.rightWordsBag = wordsBagId;
            this.getAllWords({wordsBagId});
        },
    },
    components:{
        WordPage,
        vSelect,
        Slide
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
