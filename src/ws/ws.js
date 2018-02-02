import store from '../store/store'

var wsExp = {};

wsExp.detailWs = new WebSocket("ws://localhost:9999/detail");

wsExp.detailWs.onopen = function () {
    console.log('detailWs connected');
    wsExp.detailWs.send('first message');
};

wsExp.detailWs.onmessage = function (ev) {

    var data = JSON.parse(ev.data);
    console.log('data: ', data);
    store.commit('updateData', data['info']);

};

export default wsExp;

