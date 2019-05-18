<template>
    <div>
        <h1>Learnish</h1>
        <p>
            <router-link to="/login">Logout</router-link>
            <router-link to="/wordsBags">WordsBags</router-link>
        </p>
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