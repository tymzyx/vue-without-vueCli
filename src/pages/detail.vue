<template>
    <div class="detail-container">
        <detail-header></detail-header>
        <detail-body :headInfo="headInfo"></detail-body>
        <detail-footer></detail-footer>
    </div>
</template>

<script>
    import detailHeader from '../components/detailHeader'
    import detailBody from '../components/detailBody'
    import detailFooter from '../components/detailFooter'

    export default {
        data: function() {
            return {
                headInfo: '黄恩茹 BEJ48 TeamJ'
            }
        },
        components: {
            detailHeader, detailBody, detailFooter
        },
    }
</script>

<style>

</style>