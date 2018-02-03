<template>
    <transition name="fade">
        <div v-show="display" class="table-container">
            <a class="table-close" @click="closeTable">&#10005</a>
            <div class="table-content" ref="tableDom0"></div>
            <div class="table-content" ref="tableDom1"></div>
            <div class="table-content" ref="tableDom2"></div>
            <div class="info-content">
                <p>最热微博：<button>123</button></p>
                <p>最水微博：</p>
            </div>
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
            var chart0 = echarts.init(this.$refs.tableDom0);
            var chart1 = echarts.init(this.$refs.tableDom1);
            var chart2 = echarts.init(this.$refs.tableDom2);
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
            chart0.setOption(option);
            chart1.setOption(option);
            chart2.setOption(option);
        }
    }
</script>

<style lang="css" scoped>
    .table-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        width: 1000px;
        height: 600px;
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
    .table-content, .info-content {
        margin: 10px 40px 0 40px;
        width: 420px;
        height: 280px;
        background-color: white;
        float: left;
    }
    .info-content p {
        font-family: "Microsoft YaHei";
        margin: 30px 0 0 5px;
        text-align: left;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
</style>