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
        <h1>Add word bag</h1>
        <form id="wordsBag-form" @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="name" name="name" class="form-control" :class="{ 'is-invalid': submitted && !name }" />
                <div v-show="submitted && !name" class="invalid-feedback">Name is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit" >Add</button>
                <router-link to='/wordsBags' class="btn btn-secondary">Back to word bags</router-link>
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
            name: '',
            language: localStorage.selectedLanguageId,
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('wordsBags', ['add']),
        handleSubmit (e) {
            this.submitted = true;
            const {name, language} = this;
            if (name && this.language) {
                this.add({ name, language});
                document.getElementById('wordsBag-form').reset();
            }
        }
    },
    components: {
        Slide
    }
};
</script>