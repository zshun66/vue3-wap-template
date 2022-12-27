<script setup name="index">
	import pubsub from '@/utils/pubsub.js'
	console.log('首页')
	pubsub.subscribe('info', function(msg, data) {
		console.log('订阅', msg, data)
	})
</script>

<template>
	<div class="index-page-container">
		<svg-icon name="home_light" />
		<router-link to="/baby/detail/145465146556">宝宝详情</router-link>
		<div v-for="index in 50" :key="index">{{ index }}</div>
		<router-link to="/baby/add">添加宝宝</router-link>
		<div v-for="index in 50" :key="index">{{ index }}</div>
	</div>
</template>

<style scoped>
	.index-page-container {
		width: 750px;
		user-select: none;
	}
</style>