<script setup name="home">
	
</script>

<template>
	<div class="home-page-container">
		<router-view v-slot="{ Component, route }">
			<keep-alive>
				<component
					:is="Component"
					:key="route.name" 
					v-if="route.meta.keepAlive"
				></component>
			</keep-alive>
			<component
				:is="Component"
				:key="route.name" 
				v-if="!route.meta.keepAlive"
			></component>
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