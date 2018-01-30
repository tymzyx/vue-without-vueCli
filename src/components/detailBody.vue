<template>
    <div class="body-content">
        <h4> {{ headInfo }} </h4>
        <img :src="memberImg" alt="">
        <div class="info-content">
            <ul>
                <li v-for="item in lists">{{ item }}</li>
            </ul>
            <p v-for="item in experience">{{ item }}</p>
            <img :src="teamImg" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        props:["headInfo", "memberImg", "lists", "experienceDes", "teamImg"],
        computed: {
            experience: function () {
                var ret = [];
                var split0 = this.experienceDes.split(':');
                ret.push(split0[0] + ':');
                var split1 = split0[1].split(';');
                ret = ret.concat(split1);
                return ret;
            }
        }
    }
</script>

<style lang="css" scoped>
    .body-content {
        width: 1000px;
        display: block;
        /*height: 480px;*/
        overflow: hidden; /* http://www.divcss5.com/jiqiao/j612.shtml */
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
    .info-content ul {
        overflow: hidden;
    }
    .info-content li {
        width: 50%;
        float: left;
        text-align: left;
        list-style: none;
        margin: 8px 0;
    }
    .info-content p {
        text-align: left;
        margin-left: 40px;
    }
</style>