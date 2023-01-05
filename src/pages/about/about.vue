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
</script>

<template>
	<div class="about-page-container">
		<p>关于</p>
		<span>{{ $t('title') }}:</span>
		<span>{{ $t('info.name') }}</span>
		<button @click="handleChangeLang">切换语言</button>
	</div>
</template>

<style scoped>
	.about-page-container {
		width: 100%;
		min-height: 100%;
		background: #c3b2ee;
	}
</style>
