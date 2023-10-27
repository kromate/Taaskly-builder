<template>
	<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="36" cy="36" r="35.5" fill="currentColor" stroke="black" />
		<path d="M51.5 36C51.5 44.5604 44.5604 51.5 36 51.5C27.4396 51.5 20.5 44.5604 20.5 36C20.5 27.4396 27.4396 20.5 36 20.5C44.5604 20.5 51.5 27.4396 51.5 36Z" stroke="black" />
		<path id="white" d="M39.9101 26.7185V29.2886H38.0853C37.8231 29.2886 37.4665 29.3525 37.1664 29.5987C36.8476 29.8603 36.6678 30.2651 36.6678 30.7905V32.9539V33.4539H37.1678H39.8463L39.5713 36.1263H37.1675H36.6675V36.6263V46.5857H33.3419V36.6263V36.1263H32.8419H31.2847V33.4505H32.8419H33.3419V32.9505V30.5718C33.3419 29.7862 33.5307 28.8122 34.0931 28.0479C34.6363 27.3099 35.5707 26.7074 37.205 26.7071C37.2053 26.7071 37.2057 26.7071 37.206 26.7071L39.9101 26.7185Z" stroke="black" />

		<!-- <defs>
			<clipPath id="clip0_18_33">
				<rect width="32" height="32" fill="currentColor " transform="translate(20 20)" />
			</clipPath>
		</defs> -->
	</svg>
</template>

<style scoped lang="scss">
path, circle{
    stroke: black;
    transition: all 0.25s ease-in-out;
    @media (max-width: 680px) {
        stroke: white;
    }
}

svg:hover > circle, svg:hover > path{
    stroke: white;
}
svg:hover > #white{
    fill: white;
}
svg > #white{
        @media (max-width: 680px) {
          fill: white;
    }
}
</style>
