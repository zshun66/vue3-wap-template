<script setup name="baby-list">
	console.log('宝宝列表')
</script>

<template>
	<div class="baby-list-page-container">
		<p v-for="index in 100" :key="index">宝宝列表</p>
		<router-link to="/baby/modify">宝宝修改</router-link>
	</div>
</template>

<style scoped>
	.baby-list-page-container {
		width: 100%;
		min-height: 100%;
		background: #cf1cee;
	}
</style>