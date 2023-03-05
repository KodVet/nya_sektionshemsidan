<script>
	import SponsorCard from "./SponsorCard.svelte";
	import { sponsors } from '@data/sponsorer/footer.json'
    export const sponsorer = []
</script>

<div class="container">
	<div class="wrapper">
		<main>
			<slot/>
			<div class="sponsors">
				<SponsorCard bgColor={'transparent'} sponsors={sponsors}/>
			</div>
			<div class="arkiv">tja</div>
		</main>
		<hr>
		<div class="copyright">
			<p>© KOGVET {new Date().getFullYear()}</p>
		</div>
	</div>
</div>

<style lang="scss">
    .container {
		width: 100%;
		height: fit-content;
		background-color: var(--footer-bg);
		margin-top: auto;
		color: white;
		/* display: flex; */
		/* justify-self: end; */
		:global(h3) {
			color: white !important;
		}
		.wrapper {
			margin-block: 50px;
			display: flex;
			flex-direction: column;
			margin: auto;
			margin-block: 50px;
			width: 50%;
			main {
				display: flex;
				justify-content: space-between;
				.sponsors {
					width: 300px;
				}
			}
			hr {
				width: 100%;
				border-style: solid;
			}
		}
	}
</style>