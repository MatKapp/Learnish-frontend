<template>
    <div id='wrapper'>
        <div class="list-group" id="left-list">
        <div class="mb-5 ml-5 mr-5">
            <h3 >Words in the words bag {{this.$route.params.wordsBagId}}:</h3>
            <router-link class="btn btn-outline-secondary d-inline m-2" to='/wordsBags'>
            Wordbags
            </router-link>
        </div>
        <div v-if="words.items">
            <div v-for="word in words.items" :key="word.id">
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
        <div v-if="words.items">
            <div v-for="word in words.items" :key="word.id">
                  <word-page :word=word :wordsBagId=$route.params.wordsBagId></word-page>
            </div>
        </div>
    </div>
    </div>    
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddWordPage from './AddWordPage'
import WordPage from './WordPage'

export default {
    computed: {
        ...mapState({
            words: state => state.words.all
        })
    },
    created () {
        var wordsBagId = this.$route.params.wordsBagId;
        this.getAllWords({wordsBagId});
    },
    methods: {
        ...mapActions('words', {
            getAllWords: 'getAll',
        }),
        createPDF(){
            var jsPDF = require('jspdf');
            require('jspdf-autotable');
            let pdfName = 'wordsToLearn' + this.$route.params.wordsBagId;
            var doc = new jsPDF();
            var rows = [] 

            this.words.items.forEach(element => {
                var temp = [element.spelling, element.translation];
                rows.push(temp);
            });

            doc.autoTable(
                {
                    head: [['Word', 'Translation']],
                    body: rows,
                }
            );
            doc.save(pdfName + '.pdf');
        },
        collapse_id(id){
            console.log('collapse id');
            console.log(id);
            return 'move_word_' + id
        },
        move_word(event){
            //replace all non-digits with nothing
            let word_id = event.target.id.replace( /^\D+/g, '');;
            console.log(word_id);
        },
    },
    components:{
        WordPage,
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
