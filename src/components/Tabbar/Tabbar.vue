<script setup name="Tabbar">
    const active = ref('home:index')
    const tabbars = [
        {
            title: '首页',
            name: 'home:index',
            to: {
                path: '/home/index',
            },
            icon: 'home-o'
        },
        {
            title: '百宝箱',
            name: 'home:box',
            to: {
                path: '/home/box'
            },
            icon: 'gift-o'
        },
        {
            title: '我的',
            name: 'home:my',
            to: {
                path: '/home/my'
            },
            icon: 'friends-o'
        }
    ]
</script>

<template>
    <van-tabbar
        class="tabbar-component-container"
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