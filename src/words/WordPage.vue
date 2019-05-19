<template>  
    <div class="word list-group-item p-3 pl-5 m-2">
      <div class="box">
          <div class="media-content">
            <div class="content">
              <p>
                <strong class="list-group-item-heading">{{word.spelling}}</strong> <small>{{word.translation}}</small>
                <br>
              </p>
            </div>
              <div class="list-group-item-text">
                  {{word.translation}}
              </div>
          </div>
      </div>
    </div> 
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: ["word"],
    computed: {
        ...mapState({
            words: state => state.words.all
        })
    },
    methods: {
        ...mapActions('words', {
            getAllWords: 'getAll',
            deleteWord: 'delete'
        })
    },
};
</script>

