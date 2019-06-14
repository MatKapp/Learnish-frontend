<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 p-0">
                <div class="jumbotron min-vh-100 text-center m-0 d-flex flex-column justify-content-center">
                                <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                                <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>
<style>
.jumbotron{
    background-size: cover; 
    height: 100%;
    width: 100%;
}
</style>
