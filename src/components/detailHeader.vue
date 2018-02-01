<template>
    <div>
        <h3>成员资料：</h3>
        <button @click="$store.commit('add')">{{ count }}</button>
        <button @click="myCount">{{ count }}</button>
    </div>
</template>

<script>
    import store from '../store/store'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                ct: '',
            }
        },
        store,
        computed: {
            // ...mapState(['count']),
            count() {
                return this.$store.getters.newCount;
            }
        },
        methods: {
            myCount: function () {
                this.$store.dispatch('addAction');
            }
        }
    }
</script>

<style lang="css" scoped>
    div {
        margin: 15px;
        text-align: left;
        margin-left: 8px;
    }
</style>