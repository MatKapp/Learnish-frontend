<template>
    <div>
        <h1>Add word</h1>
        <form id="word-form" @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="spelling">Spelling</label>
                <input type="text" v-model="spelling" name="spelling" class="form-control" :class="{ 'is-invalid': submitted && !spelling }" />
                <div v-show="submitted && !spelling" class="invalid-feedback">Spelling is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="name">Name</label>
                <input type="name" v-model="name" name="name" class="form-control" :class="{ 'is-invalid': submitted && !name }" />
                <div v-show="submitted && !name" class="invalid-feedback">Name is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="language">Language</label>
                <input type="language" v-model="language" name="language" class="form-control" :class="{ 'is-invalid': submitted && !language }" />
                <div v-show="submitted && !language" class="invalid-feedback">Language is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit" >Add word</button>
                <router-link to="/" class="btn btn-link">Home</router-link>
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
            name: '',
            language: 1,
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('words', ['add']),
        handleSubmit (e) {
            this.submitted = true;
            const {language, spelling, name } = this;
            if (language && spelling && name) {
                this.add({ language, spelling, name })
            }
        }
    }
};
</script>