<script setup name="index">
	const pFunc = function() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(89899)
			}, 3000)
		})
	}
	// let res = await pFunc()
	// console.log(res)
	
	
	const execFunc = async function() {
		let res = await pFunc()
		console.log(res)
	}
	execFunc()
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