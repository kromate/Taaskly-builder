<template>
	<main class="flex flex-col md:items-center justify-center text-white h-screen container px-4">
		<!-- <h1 class="font-bold text-3xl md:text-6xl max-w-[800px] md:text-center mx-auto !leading-[1.25] tracking-[0.1px] mt-12">
			Create the website your
			business needs
		</h1> -->
		<h1 class="flex flex-col ">
			<span class="flex flex-wrap md:gap-3">
				<div class="header_text ">
					Create the
				</div>
				<div class="animtaion-content md:text-6xl text-3xl md:h-[80px] h-[40px]">
					<div class="h1 text-secondary ta-1">
						Website
					</div>
					<div class="h1 text-secondary ta-2">
						Link-in-bio
					</div>
					<div class="h1 text-secondary ta-3">
						Store
					</div>
					<div class="h1 text-secondary ta-4">
						Blog
					</div>
					<div class="h1 text-secondary ta-4">
						Newsletter
					</div>
				</div>
			</span>

			<div class="header_text ">
				your
				business needs
			</div>
		</h1>
		<p class=" mt-5 md:mt-12 md:max-w-[700px] md:text-center md:text-lg font-medium">
			What do you want to build?
		</p>
		<div class="flex flex-col items-center mt-12 text-center w-full max-w-md mx-auto">
			<span class="relative flex w-full  gap-4 md:justify-center">
				<nuxt-link to="/main/home" class="btn_home bg-[#B5AFFF] text-lg font-semibold text-black w-full"> Get started </nuxt-link>

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
.header_text{
  @apply font-bold text-3xl md:text-6xl max-w-[800px] md:text-center  !leading-[1.25] tracking-[0.1px]  flex;
}
.btn_home{
  @apply w-auto py-2 px-7;
  border-radius: 36px;
border: 1px solid #000;
background: var(--soft-purple, #B5AFFF);
box-shadow: 4.28591px 3.4823px 0px 0px #000;
}

</style>

<style>
.animtaion-content {
	display: block;
	overflow: hidden;
	/* height: 80px; */
}
.h1.text-secondary.ta-1 {
	height: 80px;
	margin-bottom: 0rem;
	padding-top: 0px;
	padding-right: 0px;

}
.text-secondary {
	color: #dbfd51;
}
.h1 {
	margin-top: 0px;
	margin-bottom: 1rem;
	padding-top: 20px;
	padding-right: 40px;
	padding-bottom: 0px;
	line-height: 1.03;
	font-weight: 600;
	transform: translate3d(0px, 0%, 0px);
	transform-style: preserve-3d;
        animation: change 7s infinite alternate;

}

@keyframes change {
	0% {
		transform:  translate3d(0px, 0%, 0px);
	}
	25% {
		transform: translate3d(0px, -120%, 0px);
	}
	50% {
		transform: translate3d(0px, -250%, 0px);
	}
	75% {
		transform: translate3d(0px, -360%, 0px);
	}
	100% {
		transform: translate3d(0px, -470%, 0px);
	}
}

@media screen and (max-width: 680px) {
@keyframes change {
	0% {
		transform:  translate3d(0px, 0%, 0px);
	}
	25% {
		transform: translate3d(0px, -95%, 0px);
	}
	50% {
		transform: translate3d(0px, -240%, 0px);
	}
	75% {
		transform: translate3d(0px, -360%, 0px);
	}
	100% {
		transform: translate3d(0px, -480%, 0px);
	}
}
.h1.text-secondary.ta-1 {
	height: auto;
	margin: 0rem;
	padding-top: 0px;
	padding-right: 0px;

}
}
</style>
