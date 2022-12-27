<script setup name="baby-detail">
	import pubsub from '@/utils/pubsub.js'
	console.log('宝宝详情')
	pubsub.publish('info.stud', { name: '张三', age: 22 })
	setTimeout(() => {
		pubsub.publish('info.book', { name: '沙发斯蒂芬', age: 3 })
	}, 3000)
</script>

<template>
	<div class="baby-detail-page-container">
		宝宝详情
	</div>
</template>

<style scoped>
	.baby-detail-page-container {
		width: 100%;
		min-height: 100%;
		background: #31ccee;
	}
</style>