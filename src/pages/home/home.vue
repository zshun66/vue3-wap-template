<script setup name="home">
	
</script>

<template>
	<div class="home-page-container">
		<router-view v-slot="{ Component, route }">
			<template v-if="Component && route.meta.keepAlive">
				<transition mode="out-in">
					<keep-alive>
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</template>
			<template v-if="Component && !route.meta.keepAlive">
				<transition mode="out-in">
					<component :is="Component"></component>
				</transition>
			</template>
		</router-view>
		
		<Tabbar />
	</div>
</template>

<style scoped>
	.home-page-container {
		width: 100%;
		min-height: 100%;
	}
</style>