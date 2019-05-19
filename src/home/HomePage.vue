<template>
    <div>
        <h1 class="display-1">Learnish</h1>
        <div class="m-5">
            <router-link class=" d-inline word list-group-item p-4 m-3 btn btn-outline-secondary btn-lg" to="/login">Logout</router-link>
            <router-link class=" d-inline word list-group-item p-4 m-3 btn btn-outline-secondary btn-lg" to="/wordsBags">WordsBags</router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
        })
    },
};
</script>