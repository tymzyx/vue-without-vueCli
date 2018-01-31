<template>
    <transition name="fade">
        <div v-show="display" class="table-container">
            <a class="table-close" @click="closeTable">&#10005</a>
            <div class="table-content" ref="tableDom"></div>
        </div>
    </transition>
</template>

<script>
    import echarts from 'echarts'

    export default {
        props:["display"],
        methods: {
            closeTable: function () {
                this.$emit('triggerClose');
            }
        },
        mounted: function() {
            var chart = echarts.init(this.$refs.tableDom);
            var option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            };
            chart.setOption(option);
        }
    }
</script>

<style lang="css" scoped>
    .table-container {
        position: absolute;
        top: 20%;
        left: 34%;
        width: 400px;
        height: 400px;
        border-radius: 15px;
        box-shadow: 0px 0px 5px black;
        background-color: white;
        opacity: 0.9;
        text-align: center;
    }
    .table-close {
        position: absolute;
        right: 10px;
        top: 4px;
        cursor: pointer;
    }
    .table-content {
        margin: 26px auto auto auto;
        width: 360px;
        height: 360px;
        background-color: white;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
</style>