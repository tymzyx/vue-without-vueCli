<template>
    <div class="body-content">
        <h4> {{ headInfo }} </h4>
        <img :src="memberImg" alt="">
        <div class="info-content">
            <ul>
                <li v-for="item in lists">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props:["headInfo", "memberImg", "lists"]
    }
</script>

<style lang="css" scoped>
    .body-content {
        width: 1000px;
        display: block;
        height: 480px;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }
    .body-content h4 {
        text-align: center;
    }
    .body-content img {
        margin: 8px;
        float: left;
    }
    .info-content {
        float: left;
        width: 600px;
        min-width: 600px;
    }
    .info-content li {
        width: 50%;
        float: left;
        text-align: left;
        list-style: none;
        margin: 8px 0;
    }
</style>