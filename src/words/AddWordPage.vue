<template>
    <div class="  w-25 mx-auto">
        <Slide>
            <a id="home" href="/"> 
                <span>Home</span>  
            </a>
            <a id="home" href="/wordsBags"> 
                <span>Word bags</span>  
            </a>
        </Slide>
        <h1>Add word</h1>
        <form id="word-form" @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="spelling">Spelling</label>
                <input type="text" v-model="spelling" name="spelling" class="form-control" :class="{ 'is-invalid': submitted && !spelling }" />
                <div v-show="submitted && !spelling" class="invalid-feedback">Spelling is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit" >Add</button>
                <router-link :to="'/words/' + this.$route.params.wordsBagId" class="btn btn-secondary">Back to word bag</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Slide } from 'vue-burger-menu'


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
    },
    components: {
        Slide
    }
};
</script>