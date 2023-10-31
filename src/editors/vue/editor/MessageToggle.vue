<script setup lang="ts">
const visible = defineModel<boolean>()
</script>

<template>
	<div class="wrapper gap-2" :class="[{ active: modelValue }]" @click="visible = !visible">
		<span>Show Error</span>
		<div class="toggle">
			<div class="indicator" />
		</div>
	</div>
</template>

<style scoped lang='scss'>
.wrapper {
  position: absolute;
  font-weight: 500;
  bottom: 8px;
  right: 15px;
  z-index: 11;
  display: flex;
  align-items: center;
  background-color: var(--bg);
  color: var(--text-light);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 2px;
  user-select: none;
}
.toggle {
  display: inline-block;
  margin-left: 4px;
  width: 36px;
  height: 20px;
  border-radius: 12px;
  position: relative;
  border: 1.5px solid black;
  background-color: var(--border);
}

.indicator {
  font-size: 12px;
  background-color: var(--text-light);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transition: transform ease-in-out 0.2s;
  position: absolute;
  left: 2px;
  top: 1.5px;
  color: var(--bg);
  text-align: center;
}

.active{
  color: var(--secondary);
 .indicator {
  background-color: var(--secondary);
  transform: translateX(15px);
}
}

</style>
