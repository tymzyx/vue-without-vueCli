<template>
    <li class="member-list">
        <router-link to="/detail" class="member-list-link">
            <div class="member-list-pic">
                <img alt="" :src="memberImg">
            </div>
        </router-link>
    </li>
</template>

<script>
    export default {
        props: ["memberImg"]
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