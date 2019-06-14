<template>
    <div>
        <div>
            <div>
                <h1 class="display-1">Learnish</h1>
            </div>
            <div class="w-25 mx-auto">
                <h3>
                    Language to learn:
                </h3>
                <v-select :options="languages.items" :reduce="item => item.name" label="name" @input="onChange"></v-select>
            </div>
        </div>
        <div class="m-5">
            <router-link class=" d-inline word list-group-item p-4 m-3 btn btn-outline-secondary btn-lg" to="/login">Logout</router-link>
            <router-link class=" d-inline word list-group-item p-4 m-3 btn btn-outline-secondary btn-lg" to="/wordsBags">WordsBags</router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
    computed: {
        ...mapState({
            languages: state => state.users.languages,
        })
    },
    created () {
        this.getLanguages();
    },
    methods: {
        ...mapActions('users', {
            getLanguages: 'getLanguages',
            setLangueage: 'setLanguage'
        }),
        onChange(val) {
            var selectedLanguage = this.languages.items.find(
                language => language.name == val
            )

            localStorage.setItem("selectedLanguageId", selectedLanguage.pk)
        },
    },
    components: {
        vSelect
    }
};
</script>