
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

export default chartExp;
