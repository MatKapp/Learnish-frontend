<template>
    <div>
        <h1>Add word to {{wordsBagId}} wordsBag</h1>
        <form id="word-form" @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="spelling">Spelling</label>
                <input type="text" v-model="spelling" name="spelling" class="form-control" :class="{ 'is-invalid': submitted && !spelling }" />
                <div v-show="submitted && !spelling" class="invalid-feedback">Spelling is required</div>
            </div>
            <!-- <div class="form-group">
                <label htmlFor="language">Language</label>
                <input type="language" v-model="language" name="language" class="form-control" :class="{ 'is-invalid': submitted && !language }" />
                <div v-show="submitted && !language" class="invalid-feedback">Language is required</div>
            </div> -->
            <div class="form-group">
                <button class="btn btn-primary" type="submit" >Add word</button>
                <router-link :to="'/words/' + this.$route.params.wordsBagId" class="btn btn-link">Words bag {{this.$route.params.wordsBagId}}</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            spelling: '',
            submitted: false
        }
    },
    props: ["wordsBag"],
    created () {
        this.wordsBagId = this.$route.params.wordsBagId;
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('words', ['add']),
        handleSubmit (e) {
            this.submitted = true;
            const {spelling, wordsBagId } = this;
            if (spelling  && wordsBagId) {
                this.add({ spelling , wordsBagId});
                this.spelling = '';
                this.submitted = false;
                e.target.reset();
            }
        }
    }
};
</script>