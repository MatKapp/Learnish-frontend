<template>
    <div>
        <div>
            <div>
                <h1 class="display-1">Learnish</h1>
            </div>
            <div>
                <h3>
                    Language:
                </h3>
                <v-select :options="languages.items" :reduce="item => item.name" label="name" :value="selectedLanguage"></v-select>
            </div>
        </div>
        <div class="m-5">
            <router-link class=" d-inline word list-group-item p-4 m-3 btn btn-outline-secondary btn-lg" to="/login">Logout</router-link>
            <router-link class=" d-inline word list-group-item p-4 m-3 btn btn-outline-secondary btn-lg" to="/wordsBags">WordsBags</router-link>
        </div>
        Wybrany
            {{selectedLanguage}}
            Wybrany
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import vSelect from 'vue-select'

export default {
    computed: {
        ...mapState({
            languages: state => state.users.languages,
            selectedLanguage: state => state.users.selectedLanguage,
        })
    },
    created () {
        this.getLanguages();
    },
    methods: {
        ...mapActions('users', {
            getLanguages: 'getLanguages',
            setLangueage: 'setLanguage'
        })
    },
    components: {
        vSelect
    }
};
</script>