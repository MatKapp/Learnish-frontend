<template>
    <div class="list-group">
        <Slide>
            <a id="home" href="/"> 
                <span>Home</span>  
            </a>
            <a id="wordsBags" href="/wordsBags"> 
                <span>Back to wordsBags</span>  
            </a>
            <a id="manageWordsBag" :href="'/wordsBags/' + this.$route.params.wordsBagId + '/manage'"> 
                <span>Manage wordsBag</span>  
            </a>
        </Slide>
        <div class="mb-5">
            <h3 >Learning from wordsBag:</h3>
            <router-link class="btn btn-outline-secondary d-inline m-2" to='/wordsBags'>
                Select wordsBag
            </router-link>
        </div>
        <div v-if="guessedWord.spelling != undefined" v-bind:class="[goodAnswer ? 'bg-success' : 'bg-danger']">
            <h5>
                Previous word
            </h5>
            <div id="guessed-word">
                <div>
                    <word-page :word=guessedWord withTranslation='true' :wordsBagId=$route.params.wordsBagId></word-page>
                </div>
            </div>
        </div>
        <div>
            <h5>
                Word to guess:
            </h5>
            <div>
                  <word-page :word=wordToGuess withTranslation='false' :wordsBagId=$route.params.wordsBagId></word-page>
            </div>
            <div>
                <div class="input-group mb-3">
                <input id="translation-answer" type="text" class="form-control" placeholder="Translation" aria-label="Translation" aria-describedby="basic-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="submitAnswer">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import WordPage from './WordPage'
import { Slide } from 'vue-burger-menu'


export default {
    computed: {
        ...mapState({
            wordToGuess: state => state.words.wordToGuess.word,
        })
    },
    data () {
        return {
            guessedWord: {},
            goodAnswer: true,
        }
    },
    created () {
        var wordsBagId = this.$route.params.wordsBagId;
        this.getWordToGuess({wordsBagId});
    },
    methods: {
        ...mapActions('words', {
            getWordToGuess: 'getWordToGuess',
            reactToGuess: 'reactToGuess'        
        }),
        submitAnswer(event){
            var input = document.getElementById('translation-answer');
            let answer = input.value;

            if (answer != ''){
                this.guessedWord = this.wordToGuess;
                input.value = "";
                let wordId = this.wordToGuess.pk
                var wordsBagId = this.$route.params.wordsBagId;
                this.checkAnswer(answer, this.wordToGuess.translation);

                this.reactToGuess({answer, wordId, wordsBagId});
            }
        },
        checkAnswer(answer, spelling){
            if (answer == spelling){
                this.goodAnswer = true;
            }
            else{
                this.goodAnswer = false;
            }
        },
    },
    components:{
        WordPage,
        Slide
    }
};
</script>