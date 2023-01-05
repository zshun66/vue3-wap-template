<script setup name="about">
	import { useI18n } from 'vue-i18n'
	const { locale } = useI18n()
	const handleChangeLang = function() {
		if (locale.value == 'en-US') {
			locale.value = 'zh-CN'
		} else if (locale.value == 'zh-CN') {
			locale.value = 'en-US'
		}
	}

	const copyContent = ref('感觉卡时候点击卡哪款拉时间段看了就看了就立刻6669999')
	const onSuccess = function(e) {
		console.log('复制成功', e.text)
	}
	const onError = function(e) {
		console.log('复制失败', e)
	}
</script>

<template>
	<div class="about-page-container">
		<p class="zoomIn" style="text-align: center;">关于</p>
		<span>{{ $t('title') }}:</span>
		<span>{{ $t('info.name') }}</span>
		<button @click="handleChangeLang">切换语言</button>
		<div>
			<input type="text" v-focus />
		</div>
		<van-button
			type="primary"
			v-clipboard:copy="copyContent"
			v-clipboard:success="onSuccess"
			v-clipboard:error="onError"
		>复制</van-button>
	</div>
</template>

<style scoped>
	.about-page-container {
		width: 100%;
		min-height: 100%;
		background: #c3b2ee;
	}
</style>
