<script setup name="about">
import { reactive } from 'vue';
	const copyContent = ref('感觉卡时候点击卡哪款拉时间段看了就看了就立刻6669999')
	const onSuccess = function(e) {
		console.log('复制成功', e.text)
	}
	const onError = function(e) {
		console.log('复制失败', e)
	}

	// const parentID = ref('')
	// const handleClick = function() {
	// 	if (parentID.value == 'out') {
	// 		parentID.value = 'inner'
	// 	} else if (parentID.value == 'inner') {
	// 		parentID.value = 'out'
	// 	} else {
	// 		parentID.value = 'inner'
	// 	}
	// }

	const throttleObj = reactive({
		event: 'click',
		callback (e) {
			console.log(e, 666888, this)
		},
		delay: 500,
		leading: true,
		training: true
	})
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

		<!-- <div id="out" style="margin: 20px 10px; height: 400px; border: 10px solid red; padding: 50px 50px; box-sizing: border-box;">
			<div id="inner" style="width: 100%; height: 100%;border-top: 5px solid blue;border-bottom: 30px solid blue;
			border-left: 20px solid blue;border-right: 10px solid blue; box-sizing: border-box;">
				<div style="width: 100px; height: 100px; background-color: aquamarine; border: 10px solid yellow; margin: 20px 20px;
				box-sizing: border-box;" v-drag:[parentID].nocross></div>
			</div>
		</div>
		<button @click="handleClick">点击1</button>
		<button @click="parentID = ''">点击2</button> -->

		<button v-throttle="throttleObj">按钮</button>
	</div>
</template>

<style scoped>
	.about-page-container {
		width: 100%;
		min-height: 100%;
		background: #c3b2ee;
	}
</style>
