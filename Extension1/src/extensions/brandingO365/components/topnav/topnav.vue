<template>
	<div id="dvtopnav">
		<ul>
			<li @click="tesing(1)">One</li>
			<li  @click="tesing(2)">Two</li>
			<li  @click="tesing(2)">Three</li>
		</ul>
	</div>
</template>

<script>
	module.exports = require("./topnav");
</script>

<style src="./topnav.scss" lang="sass" scoped>

</style>
