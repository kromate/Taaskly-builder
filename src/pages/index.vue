<template>
	<main class="flex flex-col items-center justify-center h-screen container px-4">
		<h1 class="font-black text-3xl md:text-5xl max-w-[800px] md:text-center mx-auto !leading-[1.25] tracking-[0.1px] mt-12">
			Create a <i>website</i>, <i>link in bio</i>, <i>forms</i>, <i>blogs</i>, and <i>online stores</i> in minutes
		</h1>
		<p class="mx-auto mt-5 md:mt-12 md:max-w-[700px] md:text-center md:text-lg font-medium">
			Taaskly sites allows users to browse through a variety of websites, link in bio, forms, blogs, online stores and more, select your desired sites and deploy in minutes.
		</p>
		<div class="flex flex-col items-center mt-12 text-center w-full max-w-md mx-auto">
			<span class="relative flex w-full  gap-4">
				<nuxt-link to="/main/home" class="btn-primary w-full"> Get Started </nuxt-link>
				<nuxt-link to="#" class="btn-secondary w-full"> Templates <span class="text-xs ml-2">(coming soon)</span>  </nuxt-link>

			</span>
		</div>
	</main>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: 'landing'
})
</script>

<style scoped>
i {
	@apply underline
}
i {
  text-align: center;
  color: #4f1ded;
  background: linear-gradient(141.27deg,#4f1ded -4.24%,#4f1ded 21.25%,#7e1d85 44.33%,#4391a7 83.46%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* background-image: -webkit-linear-gradient(0deg, #4f1ded, #000000); */
  background-clip: text;
  /* text-fill-color: transparent; */
  animation: grad 5s infinite linear;
}

@keyframes grad {
0%{
    background-position: 0 50%;
}
50% {
    background-position: 100% 50%;
}
100% {
    background-position: 0 50%;
}
}
/* @keyframes hue {
  from {
    -webkit-filter: hue-rotate(0deg);
  }
  to {
    -webkit-filter: hue-rotate(-360deg);
  }
} */
</style>
