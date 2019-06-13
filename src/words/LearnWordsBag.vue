<template>
    <div class="list-group">
        <div class="mb-5">
            <h3 >Learning from wordsBag:</h3>
            <router-link class="btn btn-outline-secondary d-inline m-2" to='/wordsBags'>
                Select wordsBag
            </router-link>
        </div>
        <div>
            <h5>
                Previous word
            </h5>
            <div v-if="guessedWord" id="guessed-word">
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

export default {
    computed: {
        ...mapState({
            wordToGuess: state => state.words.wordToGuess.word,
        })
    },
    data () {
        return {
            guessedWord: {}
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
                input.value = "";
                let wordId = this.wordToGuess.pk
                var wordsBagId = this.$route.params.wordsBagId;
                this.guessedWord = this.wordToGuess;
                this.checkAnswer(answer, this.wordToGuess.translation);

                this.reactToGuess({answer, wordId, wordsBagId});
            }
        },
        checkAnswer(answer, spelling){
            var element = document.getElementById("guessed-word");

            if (answer == spelling){
                element.classList.remove("bg-danger");
                element.classList.add("bg-success");
            }
            else{
                element.classList.add("bg-danger");
                element.classList.remove("bg-success");
            }
        },
    },
    components:{
        WordPage,
    }
};
</script>