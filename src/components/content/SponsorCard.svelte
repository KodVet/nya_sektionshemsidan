<script>
    export let size
    export let hideSocials = false
    export let bgColor = 'rgba(255, 255, 255, 0.79)'
    import { sponsors as defaultSponsors } from '@data/sponsorer/panel'
    import Socials from './Socials.svelte';
    export let sponsors = defaultSponsors
    import Icon from '@iconify/svelte/dist/Icon.svelte'
    import FaFacebookF from 'svelte-icons/fa/FaFacebookF.svelte'
    import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
    import { afterUpdate } from 'svelte';
    let media
    afterUpdate(()=> {
        media = window?.matchMedia('(max-width: 800px').matches
        console.log(media)
    })
    let width
    $: fontSize = size ? size : media ? width / 20 : width / 15
    $: console.log("fontsize", fontSize)

</script>

<div id="SponsorCard" bind:clientWidth={width} on:click={()=>console.log("clientWidth", width)} style="--bgColor: {bgColor}">
    {#if !hideSocials}
    <h3>
        <slot name="socials-header">KOGVET PÅ SOCIALA MEDIA</slot>
    </h3>
    <Socials size={fontSize}/>
    <hr>
    {/if}
    <h3>
        <slot name="sponsors-header">VÅRA SPONSORER!</slot>
    </h3>
    <ul class="sponsors">
        <!-- Loopar igenom alla objekt i filen data/sponsorer/panel.json och skapar en länk av den ikonen som lagts till -->
        {#each sponsors as sponsor}
            <li>
                <a href={sponsor.href}>
                    <img class="sponsor-img" src={sponsor.img} alt="Sponsor Logga">
                </a>
            </li>
        {/each}
    </ul>
</div>


<style lang="scss">

    #SponsorCard{
        overflow-x: hidden;
        padding: 7px;
        background-color: var(--bgColor);
        /* width: 270px; */
        /* height: 300px; */
        margin: auto;
        text-align: center;
        h3 {
            text-align: center;
            color: black;
        }
        hr {
            border: solid 2px white;
            width: 90%;
        }
        ul {
            list-style: none;
            padding: 0;
            display:flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: calc(10% + 15px);
            li {
                display: flex;
                a {
                    display: block;
                    margin: auto;
                    text-decoration: none;
                }
            }
            &.sponsors {
                img {
                    width: clamp(60px, 90%, 200px);
                    flex-basis: 50%;
                    object-fit: contain;
                }
            }
        }
        
    }

    .solid{
      border-top: 2px solid #bbb;
    }

    // @media (max-width: 900px) {
    //     #SponsorCard {
    //         ul {
    //             flex-direction: column;
    //             gap: 20px;
    //         }
    //     }
    // }
    // @media (max-width: 800px) {
    //     #SponsorCard {
    //         ul {
    //             flex-direction: row;
    //             gap: 0px;
    //         }
    //     }
    // }
</style>

