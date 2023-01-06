<script setup name="about">
	const copyContent = ref('感觉卡时候点击卡哪款拉时间段看了就看了就立刻6669999')
	const onSuccess = function(e) {
		console.log('复制成功', e.text)
	}
	const onError = function(e) {
		console.log('复制失败', e)
	}

	const value = ref('44s')
	const jingdu = ref(5)
</script>

<template>
	<div class="about-page-container">
		<p class="zoomIn" style="text-align: center;">关于</p>

		<van-button
			type="primary"
			v-clipboard:copy="copyContent"
			v-clipboard:success="onSuccess"
			v-clipboard:error="onError"
		>复制</van-button>

		<div>
			<van-field v-model="value" label="文本" placeholder="请输入用户名" v-input:decimal.positive="jingdu" />
			<span>{{ value }}</span>
			<button @click="value = '888'">cg2</button>
		</div>
	</div>
</template>

<style scoped>
	.about-page-container {
		width: 100%;
		min-height: 100%;
		background: #c3b2ee;
	}
</style>
