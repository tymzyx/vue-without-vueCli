import Vue from 'vue'

var busExp = {};

busExp.bus = new Vue();
busExp.detailId = '';

busExp.bus.$on('detailUpdate', function (detailId) {
    busExp.detailId = detailId;
});

export default busExp;