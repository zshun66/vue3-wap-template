<script setup name="SvgIcon">
    const props = defineProps({
		// 图标类名
		className: {
		    type: String,
		    default: ''
		},
		// 图标前缀
		prefix: {
			type: String,
			default: 'svg-icon',
		},
        // 图标名称
        name: {
            type: String,
            required: true
        },
        // 图标大小
        size: {
            type: String,
            default: '1em'
        },
		// 图标颜色
		color: {
		    type: String,
		    default: 'currentColor'
		}
    })

	// 图标完整名称
	const iconName = computed(() => `#${ props.prefix }-${ props.name }`)
</script>

<template>
    <svg 
        class="svg-icon" 
        :class="className"
        :style="{
            fontSize: size,
			color: color,
			fill: color,
        }"
        aria-hidden="true"
    >
        <use :xlink:href="iconName" />
    </svg>
</template>

<style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        overflow: hidden;
    }
</style>