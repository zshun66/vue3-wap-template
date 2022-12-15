<script setup name="App">
	const route = useRoute()
	const router = useRouter()
	// console.log(route, router)
	
	const tranName = ref('')

	watch(() => router.currentRoute.value, (to, from) => {
		console.log(to, from)
		const names = ['index', 'box', 'my']
		if (from.path == '/' || (names.includes(to.name) && names.includes(from.name))) {
			tranName.value = ''
		} else {
			tranName.value = 'pop-in-right'
		}
	}, { immediate: false })
</script>

<template>
	<Suspense>
		<router-view v-slot="{ Component, route }">
			<transition :name="tranName">
				<keep-alive>
					<component
						:is="Component"
						:key="route.name"
						v-if="route.meta.keepAlive"
					></component>
				</keep-alive>
			</transition>
			<transition>
				<component
					:is="Component"
					:key="route.name"
					v-if="!route.meta.keepAlive"
				></component>
			</transition>
		</router-view>
	</Suspense>
</template>

<style scoped>
	
</style>
