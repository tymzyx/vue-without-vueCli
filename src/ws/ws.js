import store from '../store/store'

var wsExp = {};

wsExp.ws = new WebSocket("ws://localhost:9999/detail");

wsExp.ws.onopen = function () {
    console.log('ws connected');
    wsExp.ws.send('first message');
};

wsExp.ws.onmessage = function (ev) {

    var data = JSON.parse(ev.data);
    console.log('data: ', data);
    if (data.type === 'detail') {
        store.commit('updateData', data['info']);
    } else if (data.type === 'weibo') {
        // do something
        let processData = processWeibo(data.weiboInfo);
        console.log('processWeibo: ', processData);
        store.commit('updateChartsData', processData);
        console.log(store.state.chartsData);
    }

};

function processWeibo(weiboInfo) {
    let months = Object.keys(weiboInfo);
    months = months.map(value => parseInt(value));
    quickSort(months, 0, 2);
    if (months[0] + 1 !== months[1]) {
        months = [months[1], months[2], months[0]];
    } else if (months[2] - 1 !== months[1]) {
        months = [months[2], months[0], months[1]];
    }
    let trends = {
        attitudes: [],
        comments: [],
        reposts: [],
        creates: []
    };
    let attitudes = {};
    let comments = {};
    let reposts = {};
    let creates = {};
    let attitudeCount, commentCount, repostCount, createTime;
    for (let month in weiboInfo) {
        let monthInfo = weiboInfo[month];
        monthInfo.reverse();
        attitudes[month] = [];
        comments[month] = [];
        reposts[month] = [];
        creates[month] = [];
        for (let tempInfo of monthInfo) {
            attitudeCount = tempInfo.attitudes_count;
            commentCount = tempInfo.comments_count;
            repostCount = tempInfo.reposts_count;
            createTime = tempInfo.create_time;
            attitudes[month].push(attitudeCount);
            comments[month].push(commentCount);
            reposts[month].push(repostCount);
            creates[month].push(createTime);
        }
    }
    for (let month of months) {
        trends.attitudes = [...trends.attitudes, ...attitudes[String(month)]];
        trends.comments = [...trends.comments, ...comments[String(month)]];
        trends.reposts = [...trends.reposts, ...reposts[String(month)]];
        trends.creates = [...trends.creates, ...creates[String(month)]];
    }
    return {trends: trends};
}

function quickSort(arr, left, right) {
  let temp = arr[left];
  let i, j, t;
  i = left;
  j = right;
  if (left >= right) {
    return;
  }
  while (i !== j) {
    while (arr[j] >= temp && j > i) {
      j--;
    }
    while (arr[i] <= temp && i < j) {
      i++;
    }
    if (i < j) {
      t = arr[j];
      arr[j] = arr[i];
      arr[i] = t;
    }
  }
  arr[left] = arr[i];
  arr[i] = temp;

  quickSort(arr, left, i-1);
  quickSort(arr, i+1, right);
}

export default wsExp;

