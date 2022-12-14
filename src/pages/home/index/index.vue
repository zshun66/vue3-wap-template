<script setup name="index">
	
</script>

<template>
	<div class="index-page-container">
		<svg-icon name="home_light" />
		<div v-for="index in 100" :key="index">{{ index }}</div>
	</div>
</template>

<style scoped>
	.index-page-container {
		width: 750px;
		user-select: none;
	}
</style>