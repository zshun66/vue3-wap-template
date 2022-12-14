<script setup name="App">
	import Tabbar from '@/components/Tabbar/Tabbar.vue'
</script>

<template>
	<div class="content-container">
		<svg-icon name="home_light" />
		<div v-for="index in 100" :key="index">{{ index }}</div>
	</div>
	<Tabbar />
</template>

<style scoped>
	.content-container {
		flex: 1;
		overflow-y: auto;
		width: 750px;
		user-select: none;
	}
</style>
