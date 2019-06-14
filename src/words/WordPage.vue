<template>  
    <div class="word list-group-item p-3 pl-5 m-2">
      <div class="box">
        <div class="content">
            <p>
            <strong class="list-group-item-heading">{{word.spelling}}</strong> <small v-if="withTranslation == 'true'">{{word.translation}}</small>
            </p>
        </div>
            <div v-if="withTranslation == 'true'" class="d-inline list-group-item-text">
                {{word.translation}}
            </div>
      </div>
    </div> 
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: ["word", "wordsBagId", "withTranslation"],
    computed: {
        ...mapState({
            words: state => state.words.all
        })
    },
    methods: {
        ...mapActions('words', {
            removeWord: 'remove'
        })
    },
    created () {
        console.log(this.withTranslation);
    },
};
</script>

