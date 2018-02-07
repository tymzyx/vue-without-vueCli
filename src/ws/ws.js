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
        let processData = processWeibo(data);
        console.log('processWeibo: ', processData);
        store.commit('updateChartsData', processData);
        console.log(store.state.chartsData);
    }

};

function processWeibo(info) {
    let weiboInfo = info.weiboInfo;
    let baseInfo = info.baseInfo;
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
        creates: [],
        addresses: []
    };
    let summary = {
        post: [],
        attitude: [],
        repost: [],
        comment: []
    };
    summary['months'] = months;
    let attitudes = {};
    let comments = {};
    let reposts = {};
    let creates = {};
    let addresses = {};
    let attitudeCount, commentCount, repostCount, createTime, address;
    for (let month in weiboInfo) {
        let monthInfo = weiboInfo[month];
        monthInfo.reverse();
        attitudes[month] = [];
        comments[month] = [];
        reposts[month] = [];
        creates[month] = [];
        addresses[month] = [];
        summary.post.push(monthInfo.length);
        for (let tempInfo of monthInfo) {
            attitudeCount = tempInfo.attitudes_count;
            commentCount = tempInfo.comments_count;
            repostCount = tempInfo.reposts_count;
            createTime = tempInfo.create_time;
            address = tempInfo.address;
            attitudes[month].push(attitudeCount);
            comments[month].push(commentCount);
            reposts[month].push(repostCount);
            creates[month].push(createTime);
            addresses[month].push(address);
        }
    }
    for (let month of months) {
        trends.attitudes = [...trends.attitudes, ...attitudes[String(month)]];
        trends.comments = [...trends.comments, ...comments[String(month)]];
        trends.reposts = [...trends.reposts, ...reposts[String(month)]];
        trends.creates = [...trends.creates, ...creates[String(month)]];
        trends.addresses = [...trends.addresses, ...addresses[String(month)]];
    }

    function sum(t, value) {
        return t + value;
    }

    let avgAttitudes = trends.attitudes.reduce(sum) / trends.attitudes.length;
    let avgComments = trends.comments.reduce(sum) / trends.attitudes.length;
    let avgReposts = trends.reposts.reduce(sum) / trends.attitudes.length;
    let avgPost = trends.attitudes.length / 90;

    let strive = parseFloat(avgPost.toFixed(2));
    let popular = parseFloat(((avgAttitudes/1000 + avgComments/500 + avgReposts/100) / 3).toFixed(2));
    let narcissism = parseFloat(Math.random().toFixed(2));
    let like = 0.95;
    let potential = parseFloat((strive*0.8 + popular*0.2).toFixed(2));

    // 努力、人气、自恋、喜爱、潜力
    let radar = [strive, popular, narcissism, like, potential];

    for (let month of months) {
        summary.repost.push(Math.round(reposts[String(month)].reduce(sum) / reposts[String(month)].length));
        summary.attitude.push(Math.round(attitudes[String(month)].reduce(sum) / attitudes[String(month)].length));
        summary.comment.push(Math.round(comments[String(month)].reduce(sum) / comments[String(month)].length));
    }

    let weiboDetail = {};
    weiboDetail.nickname = baseInfo.nickname;
    weiboDetail.follower = baseInfo.follower;
    let mostPopular = Math.max(...trends.comments);
    let mostWater = Math.min(...trends.comments);
    weiboDetail.popular = trends.creates[trends.comments.indexOf(mostPopular)];
    weiboDetail.water = trends.creates[trends.comments.indexOf(mostWater)];
    weiboDetail.popularAds = trends.addresses[trends.comments.indexOf(mostPopular)];
    weiboDetail.waterAds = trends.addresses[trends.comments.indexOf(mostWater)];

    return {trends: trends, radar: radar, summary: summary, weiboDetail: weiboDetail};
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

