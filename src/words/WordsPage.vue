<template>
    <div class="list-group ">
        <Slide>
            <a id="home" href="/"> 
                <span>Home</span>  
            </a>
            <a id="wordsBags" href="/wordsBags"> 
                <span>Back to word bags</span>  
            </a>
            <a id="manageWordsBag" :href="'/wordsBags/' + this.$route.params.wordsBagId + '/manage'"> 
                <span>Manage word bags</span>  
            </a>
            <a id="downloadPDF" @click="createPDF"> 
                <span>Download as pdf</span>  
            </a>
        </Slide>
        <div class="mb-5 mr-5">
            <h3 >Words in the word bag:</h3>
            <router-link class="btn btn-outline-success d-inline m-2" :to="'/wordsBags/' + this.$route.params.wordsBagId + '/learn'">
                Learn word bag
            </router-link>
        </div>
        <div v-if="words.items" class="">
            <div v-for="word in words.items" :key="word.id" class="d-inline-block w-25">
                  <word-page :word=word withTranslation='true' :wordsBagId=$route.params.wordsBagId></word-page>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddWordPage from './AddWordPage'
import WordPage from './WordPage'
import { Slide } from 'vue-burger-menu'

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
    },
    components:{
        WordPage,
        Slide
    }
};
</script>