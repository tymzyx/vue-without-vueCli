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
    }

};

export default wsExp;

