<template>
    <div>
        <h1>Add wordsBag</h1>
        <form id="wordsBag-form" @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="name" name="name" class="form-control" :class="{ 'is-invalid': submitted && !name }" />
                <div v-show="submitted && !name" class="invalid-feedback">Name is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit" >Add wordsBag</button>
                <router-link to='/wordsBags' class="btn btn-link">WordsBags {{this.$route.params.wordsBagId}}</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
    }
};
</script>