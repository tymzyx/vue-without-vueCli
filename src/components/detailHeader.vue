<template>
    <div>
        <el-button class="back-btn" @click="goBack" icon="el-icon-arrow-left">返回</el-button>
        <!--<h3>成员资料：</h3>-->
        <button v-if="false" @click="$store.commit('add')">{{ count }}</button>
        <button v-if="false" @click="myCount">{{ count }}</button>
    </div>
</template>

<script>
    import store from '../store/store'
    import {mapState} from 'vuex'
    import ElButton from "element-ui/packages/button/src/button";

    export default {
        components: {ElButton},
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
            },
            goBack: function () {
                window.history.back();
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
    .back-btn {
        position: absolute;
        left: 10px;
        top: 10px;
    }
</style>