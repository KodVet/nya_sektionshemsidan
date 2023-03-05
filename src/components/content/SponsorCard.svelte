<script>
    export let bgColor = 'rgba(255, 255, 255, 0.79)'
    import { sponsors as defaultSponsors } from '@data/sponsorer/panel'
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
    $: fontSize = media ? width / 20 : width / 15
    $: console.log("fontsize", fontSize)

</script>

<div id="SponsorCard" bind:clientWidth={width} on:click={()=>console.log("clientWidth", width)} style="--bgColor: {bgColor}">
    <h3>KOGVET PÅ SOCIALA MEDIER</h3>
    <ul class="socials" style="--fontSize: {fontSize}px">
        <li class="facebook">
            <!-- Länk till sektionens facebook sida -->
            <a href="https://www.facebook.com/KogVet" target="_blank" rel="noreferrer">
                <!-- <Icon icon="ri:facebook-fill" width={64}/> -->
                <div class="border">
                    <div class="icon facebook">
                        <FaFacebookF />
                    </div>
                </div>
            </a>
        </li>
        <li class="instagram">
            <!-- Länk till sektionens instagram sida -->
            <a href="https://www.instagram.com/kogvetstyret/" target="_blank" rel="noreferrer">
                <div class="border">
                    <div class="icon instagram">
                        <FaInstagram />
                    </div>
                </div>
            </a>
        </li>
    </ul>
    <hr>
    <h3>VÅRA SPONSORER!</h3>
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
            gap: 15px;
            li {
                display: flex;
                a {
                    display: block;
                    margin: auto;
                    text-decoration: none;
                }
            }
            &.socials {
                justify-content: center;
                li {
                    flex-basis: 80px;
                }
                a {
                    filter: drop-shadow(0 0 1.5px black);
                    color: black;
                    font-size: clamp(26px, var(--fontSize), 46px);
                    .border {
                        display: flex;
                        width: 2em;
                        height: 2em;
                        clip-path: circle(1em);
                        background-color: #bbb;
                        .icon {
                            display: flex;
                            margin: auto;
                        }
                    }
                }
                .facebook {
                    a {

                        align-self: flex-end;
                    }
                    .icon {
                        width: 0.8em;
                        transform: translateX(-1px);
                    }
                }
                .instagram {
                    align-self: flex-start;
                    .icon {
                        width: 1.1em;
                    }
                }
            }
            &.sponsors {
                img {
                    width: clamp(100px, 90%, 200px);
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

