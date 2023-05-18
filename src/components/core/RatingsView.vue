<template>
	<div class="Stars" :style="`--rating:${value};`" aria-label="Rating of this product is 2.3 out of 5." />
</template>

<script setup>
import { ref, computed } from 'vue'
defineProps({

    value: {
        type: Number,
        default: 1
    }
})

function setRating(value) {
  rating.value = value
}

const ratingPercentage = computed(() => {
  return Math.round((rating.value / maxStars) * 100)
})
</script>

<style  lang='scss'>
:root {
  --star-size: 28px;
  --star-color:  rgb(156 163 175);
  --star-background: #fc0;
}

.Stars {
  --percent: calc(var(--rating) / 5 * 100%);
  display: inline-block;
  font-size: var(--star-size);
  font-family: Times; // make sure ★ appears correctly
  line-height: 1;

  &::before {
    content: '★★★★★';
    letter-spacing: 3px;
    background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
