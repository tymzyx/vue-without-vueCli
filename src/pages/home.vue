<template>
    <el-tabs tab-position="top" style="height: 200px;">
        <el-tab-pane v-for="(tempItems, key) in items" :label="key">
            <div class="container">
                <ul>
                    <home-list v-for="item in tempItems" :memberImg="item.srcImg" :member-name="item.name.split('|')[0]" :dataId="item.key" :teamId="key" :key="item.key" @click="clicked"></home-list>
                </ul>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import homeList from '../components/homeList'
    import busExp from '../bus/bus'
    import store from '../store/store'

    export default {
        data: function () {
            return {
                oldItems: []
            }
        },
        store,
        components: {
            homeList
        },
        methods: {
            clicked: function (itemId) {
                console.log('data: ', itemId, this.items[itemId]);
                busExp.bus.$emit('detailUpdate', itemId);
            }
        },
        computed: {
            items() {
                return this.$store.state.detailData;
            }
        },
        created: function () {
            this.oldItems = [
                {
                    key: 0,
                    srcImg: 'http://www.bej48.com/images/member/zp_20044.jpg',
                    headInfo: '黄恩茹 BEJ48 TeamJ'
                },
                {
                    key: 1,
                    srcImg: 'http://www.bej48.com/images/member/zp_20051.jpg',
                    headInfo: '孙语姗 BEJ48 TeamJ'
                }
            ];
        }
    }
</script>

<style lang="css" scoped>
    .container {
        width: 100%;
        min-width: 1100px;
    }
</style>