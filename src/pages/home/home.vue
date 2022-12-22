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
		<div class="home-subpage-container">
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
		</div>
        
		<Tabbar class="tabbar-component-container" />
	</div>
</template>

<style scoped lang="postcss">
	.home-page-container {
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: hidden;
		background: #eee;
		.home-subpage-container {
			height: calc(100% - 100px);
			overflow-x: hidden;
			overflow-y: auto;
		}
		.tabbar-component-container {
			height: 100px;
			position: relative;
		}
	}

	.die-leave-active {
		transition: all 60s;
	}
</style>