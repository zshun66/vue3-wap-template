<script setup name="home">
	console.log('HOME')
	const route = useRoute()
	const transName = ref('')
	watch(() => route.path, (newPath, oldPath) => {
		if (route.name.includes('home')) {
			transName.value = ''
		} else {
			transName.value = 'die'
		}
	})
</script>

<template>
	<div class="home-page-container">
		<router-view v-slot="{ Component, route }">
			<transition :name="transName">
				<keep-alive>
					<component
						:is="Component"
						:key="route.name"
						v-if="route.meta.keepAlive"
					></component>
				</keep-alive>
			</transition>
			<transition :name="transName">
				<component
					:is="Component"
					:key="route.name"
					v-if="!route.meta.keepAlive"
				></component>
			</transition>
		</router-view>
		
		<Tabbar />
	</div>
</template>

<style scoped>
	.home-page-container {
		width: 100%;
		min-height: 100%;
		background: #eee;
	}

	.die-leave-active {
		transition: all 60s;
	}
</style>