<template>
    <div class="container">
        <ul>
            <home-list v-for="item in items" :memberImg="item.srcImg" :key="item.key"></home-list>
        </ul>
    </div>
</template>

<script>
    import homeList from '../components/homeList'

    export default {
        data: function () {
            return {
                items: []
            }
        },
        components: {
            homeList
        },
        created: function () {
            this.items = [
                {
                    key: 0,
                    srcImg: 'http://www.bej48.com/images/member/zp_20044.jpg',
                },
                {
                    key: 1,
                    srcImg: 'http://www.bej48.com/images/member/zp_20051.jpg',
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