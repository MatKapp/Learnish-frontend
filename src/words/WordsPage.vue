<template>
    <div class="list-group">
        <div class="mb-5">
            <h3 >Words in the words bag {{this.$route.params.wordsBagId}}:</h3>
            <router-link class="btn btn-outline-secondary d-inline m-2" to='/wordsBags'>
                Wordbags
            </router-link>
            <router-link class="btn btn-outline-success d-inline m-2" :to="'/wordsBags/' + this.$route.params.wordsBagId + '/manage'">
                Manage wordsBag
            </router-link>
            <button class="btn btn-outline-success d-inline m-2" @click="createPDF">
                Save as PDF
            </button>
            <router-link class="btn btn-outline-success d-inline m-2" :to="'/wordsBags/' + this.$route.params.wordsBagId + '/learn'">
                Learn wordsbag
            </router-link>
        </div>
        <div v-if="words.items">
            <div v-for="word in words.items" :key="word.id">
                  <word-page :word=word withTranslation='true' :wordsBagId=$route.params.wordsBagId></word-page>
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
    },
    components:{
        WordPage,
    }
};
</script>