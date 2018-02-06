
let chartExp = {};

chartExp.getTrendOption = function (data) {

    let chartData = data.chartData;
    let max = Math.max(...chartData) + Math.min(...chartData) + 10;

    let option = {
        grid: {
            bottom: 20,
            right: 30,
        },
        color: ['red'],
        xAxis: {
            type: 'category',
            // name: 'Time',
            data: data.xData,
            axisLabel: {
                show: true,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
            }
        },
        yAxis: {
            type: 'value',
            max: max,
        },
        series: [{
            data: chartData,
            type: 'line',
            smooth: true,
            showSymbol: false,
        }]
    };

    return option;
};

chartExp.getRadarOption = function (data) {

    let option = {
        radar: [
            {
                indicator: [
                    {text: '努力度', max: 1, color: 'black'},
                    {text: '人气度', max: 1, color: 'black'},
                    {text: '自恋度', max: 1, color: 'black'},
                    {text: '喜爱度', max: 1, color: 'black'},
                    {text: '潜力度', max: 1, color: 'black'},
                ]
            }
        ],
        series: [{
            type: 'radar',
            data: [
                {
                    value: data.chartData
                }
            ]
        }]
    };

    return option;

};

chartExp.getSummaryOption = function (data) {

    data = data.chartData;

    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            bottom: 20,
        },
        // color: ['red', 'yellow', 'blue', 'green'],
        legend: {
            top: 20,
            data: ['微博数', '平均转发', '平均评论', '平均点赞']
        },
        xAxis: {
            type: 'category',
            data: data.months.map(val => val + ' 月'),
        },
        yAxis: {
            type: 'value',
        },
        series:[
            {
                name: '微博数',
                type: 'bar',
                data: data.post,
            },
            {
                name: '平均转发',
                type: 'bar',
                data: data.repost,
            },
            {
                name: '平均评论',
                type: 'bar',
                data: data.comment,
            },
            {
                name: '平均点赞',
                type: 'bar',
                data: data.attitude,
            },
        ]
    };

    return option;
};

export default chartExp;
