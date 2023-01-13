<script setup name="about">
	const copyContent = ref('感觉卡时候点击卡哪款拉时间段看了就看了就立刻6669999')
	const onSuccess = function(e) {
		console.log('复制成功', e.text)
	}
	const onError = function(e) {
		console.log('复制失败', e)
	}
</script>

<template>
	<div id="about-page-container" class="about-page-container">
		<p class="zoomIn" style="text-align: center;">关于</p>

		<van-button
			type="primary"
			v-clipboard:copy="copyContent"
			v-clipboard:success="onSuccess"
			v-clipboard:error="onError"
		>复制</van-button>

		<p v-for="index in 100">{{ index }}</p>

		<div id="out" style="border: 1px solid red; box-sizing: border-box;">
			<img src="" alt="" style="width: 100%; height: auto; display: flex;" v-lazy="'https://upload.pig66.com/uploadfile/2017/0511/20170511075802322.jpg'">
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
