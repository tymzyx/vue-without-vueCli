<template>
    <li class="member-list">
        <div class="member-list-pic" :data-id="dataId">
            <router-link :to="{name: 'detail', params: {detailId: dataId}}" class="member-list-link">
                <img alt="" :src="memberImg" :data-id="dataId" @click="clicked">
            </router-link>
        </div>
    </li>
</template>

<script>
    export default {
        props: ["memberImg", "dataId"],
        methods: {
            clicked: function (ev) {
                this.$emit("click", ev.target.getAttribute('data-id'));
            }
        }
    }
</script>

<style>
    .member-list {
        width: 50%;
        list-style: none;
        float: left;
        box-sizing: border-box;
        min-width: 320px;
    }
    .member-list-pic {
        vertical-align: middle;
        text-align: center;
    }
</style>