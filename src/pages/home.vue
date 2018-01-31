<template>
    <div class="container">
        <ul>
            <home-list v-for="item in items" :memberImg="item.srcImg" :dataId="item.key" :key="item.key" @click="clicked"></home-list>
        </ul>
    </div>
</template>

<script>
    import homeList from '../components/homeList'
    import busExp from '../bus/bus'

    export default {
        data: function () {
            return {
                items: []
            }
        },
        components: {
            homeList
        },
        methods: {
            clicked: function (itemId) {
                console.log('data: ', itemId, this.items[itemId]);
                busExp.bus.$emit('detailUpdate', itemId);
            }
        },
        created: function () {
            this.items = [
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
    }
</style>