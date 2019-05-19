<template>  
    <div class="word list-group-item p-3 pl-5 m-2">
      <div class="box">
        <div class="content">
            <p>
            <strong class="list-group-item-heading">{{word.spelling}}</strong> <small>{{word.translation}}</small>
            </p>
        </div>
            <div class="d-inline list-group-item-text">
                {{word.translation}}
            </div>
            <div class="d-inline float-right">
                <button class="btn btn-outline-danger" @click="removeWord({wordsBagId: wordsBagId, wordId: word.pk})">
                    Delete word
                </button>
            </div>
      </div>
    </div> 
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: ["word", "wordsBagId"],
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
};
</script>

