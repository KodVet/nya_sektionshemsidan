<script>
    export let sponsorer = []
</script>

<div class="container">
    <slot/>
</div>

<style>
    .container {
		width: 100%;
		height: 130px;
		background-color: var(--footer-bg);
		margin-top: auto;
		/* display: flex; */
		/* justify-self: end; */
	}
</style>