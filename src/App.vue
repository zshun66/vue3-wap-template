<script setup name="App">
	
</script>

<template>
	<Suspense>
		<router-view v-slot="{ Component, route }">
			<transition name="fold-left">
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
