<script setup>
    const active = ref('home')
    const tabbars = [
        {
            title: '首页',
            name: 'home',
            to: {
                path: '/home',
            },
            icon: 'home-o'
        },
        {
            title: '搜索',
            name: 'search',
            to: {
                path: '/search'
            },
            icon: 'search'
        },
        {
            title: '设置',
            name: 'setting',
            to: {
                path: '/setting',
            },
            icon: 'setting-o'
        },
        {
            title: '我的',
            name: 'my',
            to: {
                path: '/my'
            },
            icon: 'friends-o'
        }
    ]
</script>

<template>
    <van-tabbar
        class="tabbar-comonent-container"
        v-model="active"
        fixed
        border
        :z-index="1"
        :placeholder="true"
        active-color="#1989fa"
        inactive-color="#7d7e80"
        :route="true"
        :safe-area-inset-bottom="true"
    >
        <van-tabbar-item 
            v-for="(tab) in tabbars"
            :key="tab.name"
            :name="tab.name"
            :to="tab.to"
            :icon="tab.icon"
        >{{ tab.title }}</van-tabbar-item>
    </van-tabbar>
</template>

<style scoped>

</style>