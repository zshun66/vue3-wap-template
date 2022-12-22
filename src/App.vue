<script setup name="App">
	const route = useRoute()
	const router = useRouter()

	let position = 0
	const isHomePage = computed(() => route.name?.includes('home'))
	const homeTransName = ref('')
	const transName = ref('')

	watch(() => route.path, (newPath, oldPath) => {
		if (route.name.includes('home') && oldPath !== '/') {
			homeTransName.value = 'home-in'
		} else {
			homeTransName.value = 'home-out'
		}
		if (router.options.history.state.position >= position) {
			transName.value = 'page-in'
		} else {
			transName.value = 'page-out'
		}
		position = router.options.history.state.position
	})
</script>

<template>
	<Suspense>
		<router-view v-slot="{ Component, route }">
			<transition :name="homeTransName">
				<keep-alive>
					<component
						:is="Component"
						v-if="isHomePage"
					></component>
				</keep-alive>
			</transition>

			<transition :name="transName">
				<keep-alive>
					<component
						:is="Component"
						:key="route.name"
						v-if="!isHomePage && route.meta.keepAlive"
					></component>
				</keep-alive>
			</transition>

			<transition :name="transName">
				<component
					:is="Component"
					:key="route.name"
					v-if="!isHomePage && !route.meta.keepAlive"
				></component>
			</transition>
		</router-view>
	</Suspense>
</template>

<style scoped>
	
</style>
