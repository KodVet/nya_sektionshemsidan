<script>
    import { sponsors } from '@data/sponsorer/panel'
</script>

<div id="SponsorCard">
    <h3>KOGVET PÅ SOCIALA MEDIER</h3>
    <ul class="socials">
        <li>
            <!-- Länk till sektionens facebook sida -->
            <a href="https://www.facebook.com/KogVet" target="_blank" rel="noreferrer">
                <img class="Facebook" src="https://mtb6000.dk/wp-content/uploads/2021/12/png-transparent-social-media-computer-icons-facebook-inc-icon-design-social-media.png" alt="Facebook logo">
            </a>
        </li>
        <li>
            <!-- Länk till sektionens instagram sida -->
            <a href="https://www.instagram.com/kogvetstyret/" target="_blank" rel="noreferrer">
                <img class="Instagram" src="https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-instagram-icon-instagram-logo-icon-instagram-logo-16.png" alt="Instagram logo">
            </a>
        </li>
    </ul>
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
        background-color: white;
        /* width: 270px; */
        /* height: 300px; */
        margin: auto;
        text-align: center;
        h3 {
            text-align: center;
            color: black;
        }
        ul {
            list-style: none;
            padding: 0;
            display:flex;
            justify-content: space-around;
            li {
                flex-basis: 50%;
                img {
                    width : clamp(80px, 60%, 120px);
                }
            }
        }
        .socials {
            img {
            }
        }
        .sponsors {
            img {
            }
        }
    }

    .solid{
      border-top: 2px solid #bbb;
    }

    @media (max-width: 900px) {
        #SponsorCard {
            ul {
                flex-direction: column;
                gap: 20px;
            }
        }
    }
    @media (max-width: 800px) {
        #SponsorCard {
            ul {
                flex-direction: row;
                gap: 0px;
            }
        }
    }
</style>

