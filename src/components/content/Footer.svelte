<script>
	import SponsorCard from "./SponsorCard.svelte";
	import Socials from "./Socials.svelte";
	import { sponsors } from '@data/sponsorer/footer.json'

  	import { Fragment } from "react";
	// const compiledContent = mdData.compiledContent()
	import * as mdData from '@data/footer.md'
	console.log("md", mdData)
    export const sponsorer = []
</script>

<div class="container">
	<div class="wrapper">
		<main>
			<slot/>
			<div class="sponsors">
				<SponsorCard bgColor={'transparent'} sponsors={sponsors} size={20} hideSocials>
					<svelte:fragment slot="socials-header">
						{''}
					</svelte:fragment>
					<svelte:fragment slot="sponsors-header">
						Sponsorer
					</svelte:fragment>
				</SponsorCard>
			</div>
			<hr>
			<div class="organisation">
				<h3>Organisation</h3>
				<div class="socials">
					<Socials size={20}/>
				</div>
				<div>
					{@html mdData.compiledContent()}
				</div>
			</div>
			<hr>
			<div class="arkiv">
				<h3>Arkiv</h3>
			</div>
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
		:global(h3) {
			color: white !important;
			margin-top: 0;
			font-weight: initial;
			text-align: left !important;
			font-size: 1.8em;
			font-weight: bold;
		}
		.wrapper {
			margin-block: 50px;
			display: flex;
			flex-direction: column;
			margin: auto;
			margin-block: 50px;
			width: clamp(250px, 1000px, 80%);
			main {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				hr {
					display: none;
					border-color: rgba(255, 255, 255, 0.7);
					border: solid 0.9px rgba(255, 255, 255, 0.7);
					margin-bottom: 20px;
				}
				:global(ul) {
					justify-content: flex-start !important;
				}
				.sponsors {
					min-width: min-content;
					width: 18%;
					:global(#SponsorCard) {
						padding: 0;
					}
				}
				.organisation {
					.socials {
						margin-bottom: 30px;
					}
				}
			}
			hr {
				width: 100%;
				border: solid 1.3px;
			}
			.copyright {
				font-size: 1rem;
			}
		}
	}

	@media (max-width: 577px) {
		.container {
			font-size: 1rem;
			.wrapper {
				main {
					flex-direction: column;
					align-items: flex-start;
					hr {
						display: initial;
					}
				}
			}
		}
	}
</style>