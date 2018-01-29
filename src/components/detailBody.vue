<template>
    <div class="body-content">
        <h4> {{ headInfo }} </h4>
    </div>
</template>

<script>
    export default {
        props:["headInfo"]
    }
</script>

<style lang="css" scoped>
    .body-content h4 {
        text-align: center;
    }
</style>