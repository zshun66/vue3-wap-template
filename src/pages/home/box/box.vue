<script setup name="box">
	console.log('百宝箱')
</script>

<template>
	<div class="box-page-container">
		<p>百宝箱</p>
		<p>百宝箱</p>
		<p>百宝箱</p>
		<p>百宝箱</p>
		<p>百宝箱</p>
		<p>百宝箱</p>
		<p>百宝箱</p>
		<p>百宝箱</p>
		<p>百宝箱</p>
		<p>百宝箱</p>
		<p>百宝箱</p>
		<router-link to="/baby/list">宝宝列表</router-link>
		<router-link to="/baby/detail/145465146556">宝宝详情</router-link>
		<router-link to="/baby/add">添加宝宝</router-link>
		<router-link to="/about">关于我们</router-link>
	</div>
</template>

<style scoped lang="postcss">
	.box-page-container {
		a {
			margin: 0 20px;
		}
	}
</style>