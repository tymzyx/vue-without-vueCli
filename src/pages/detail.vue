<template>
    <div class="detail-container">
        <detail-header></detail-header>
        <detail-body :headInfo="infos.headInfo" :memberImg="infos.srcImg" :lists = "infos.lists" :experienceDes = "infos.experiences" :teamImg="infos.srcTeamImg"></detail-body>
        <detail-footer></detail-footer>
    </div>
</template>

<script>
    import detailHeader from '../components/detailHeader'
    import detailBody from '../components/detailBody'
    import detailFooter from '../components/detailFooter'

    import busExp from '../bus/bus'

    export default {
        data: function() {
            return {
                infos: {},
                items: []
            }
        },
        props: ["detailId"],
        components: {
            detailHeader, detailBody, detailFooter
        },
        created: function () {
            this.items = [
                {
                    key: 0,
                    srcImg: 'http://www.bej48.com/images/member/zp_20044.jpg',
                    headInfo: '黄恩茹 Huang EnRu | BEJ48 J队(Team J)',
                    lists: ['昵称: ruru', '生日: 05.05', '血型：O', '出生地：中国 浙江', '星座：金牛座', '个人特长：唱歌 弹琴 吃', '身高：165', '兴趣爱好：听音乐 看电影 唱歌 跳舞', '加入时间：2016-07-16', '最终所属：BEJ48 J队(TEAM J)', '加入所属：BEJ48 一期生', '所属公司：北京丝芭文化传媒有限公司'],
                    experiences: '经历备注:2016.07.16 加入BEJ48一期生;2016.10.01 加入BEJ48 TeamJ;2017.07.29 BEJ48 TOP16 第十名',
                    srcTeamImg: ''
                },
                {
                    key: 1,
                    srcImg: 'http://www.bej48.com/images/member/zp_20051.jpg',
                    headInfo: '孙语姗 Sun YuShang | BEJ48 J队(Team J)',
                    lists: ['昵称: yokie', '生日: 09.13', '血型：B', '出生地：中国 山东', '星座：处女座', '个人特长：吃饭特别快 画画', '身高：169', '兴趣爱好：看漫画 听音乐', '加入时间：2016-07-16', '最终所属：BEJ48 J队(TEAM J)', '加入所属：BEJ48 一期生', '所属公司：北京丝芭文化传媒有限公司'],
                    experiences: '经历备注:2016.07.16 加入BEJ48一期生;2016.10.01 加入BEJ48 TeamJ',
                    srcTeamImg: ''
                }
            ];
            console.log('$route', this.$route.params, this.detailId);
//            this.infos = this.items[busExp.detailId];
            this.infos = this.items[this.detailId];
        }
    }
</script>

<style>

</style>