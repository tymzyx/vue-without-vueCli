<template>
    <transition name="fade">
        <div v-show="display" class="table-container">
            <a class="table-close" @click="closeTable">&#10005</a>
            <div v-if="btnDisplay" @click.capture="changeTrend">
                <button class="btn0" autofocus="focus" data-type="comments">评论</button>
                <button class="btn1" data-type="reposts">转发</button>
                <button class="btn2" data-type="attitudes">点赞</button>
            </div>
            <div class="table-content" ref="tableDom0"></div>
            <div class="table-content" ref="tableDom1"></div>
            <div class="table-content" ref="tableDom2"></div>
            <div class="info-content">
                <p>目前粉丝数：</p>
                <p>目前微博等级：</p>
                <p>最热微博：<button>123</button></p>
                <p>最水微博：</p>
            </div>
        </div>
    </transition>
</template>

<script>
    import echarts from 'echarts'
    import chartExp from '../chart/charts'

    export default {
        data() {
            return {
                focus: true,
                btnDisplay: false,
                charts: {},
            };
        },
        props:["display", "chartsData"],
        methods: {
            closeTable: function () {
                this.$emit('triggerClose');
            },
            changeTrend: function(ev) {
                let type = ev.target.getAttribute("data-type");
                console.log('ev target: ', ev, type, this.chartsData);
                if (type) {
                    let trendData = {
                        chartData: this.chartsData.trends[type], xData: this.chartsData.trends.creates
                    };
                    let option = chartExp.getTrendOption(trendData);
                    this.charts.trend.setOption(option);
                }
            },
        },
        created: function() {
            console.log('dom in created:', this.$refs.tableDom0);
        },
        watch: {
            chartsData: function (val) {
                console.log('chartsData update!!!', val);
                let trendData = {
                    chartData: val.trends.comments, xData: val.trends.creates
                };
                let option = chartExp.getTrendOption(trendData);
                this.charts.trend.hideLoading();
                this.btnDisplay = true;
                this.charts.trend.setOption(option);
            }
        },
        mounted: function() {
            console.log('dom in mounted:', this.$refs.tableDom0);
            let chart0 = echarts.init(this.$refs.tableDom0);
            let chart1 = echarts.init(this.$refs.tableDom1);
            let chart2 = echarts.init(this.$refs.tableDom2);
            this.charts['trend'] = chart0;
            chart0.showLoading();
            let option = {
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
    .btn0, .btn1, .btn2 {
        text-align: center;
        position: absolute;
        color: #606266;
        cursor: pointer;
        background: white;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 6px 13px;
        top: 25px;
        font-size: 12px;
        z-index: 10;
    }
    .btn0 {
        left: 250px;
    }
    .btn1 {
        left: 315px;
    }
    .btn2 {
        left: 380px;
    }
</style>