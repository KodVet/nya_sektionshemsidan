<script>
    import { sponsors } from '@data/sponsorer/panel'
</script>

<div id="SponsorCard">
    
        <h3>Sociala medier</h3>
        <ul>
            <li>
                <!-- Länk till sektionens facebook sida -->
                <a href="https://www.facebook.com/KogVet" target="_blank">
                    <img class="Facebook" src= "https://mtb6000.dk/wp-content/uploads/2021/12/png-transparent-social-media-computer-icons-facebook-inc-icon-design-social-media.png">
                </a>
            </li>
            <li>
                <!-- Länk till sektionens instagram sida -->
                <a href="https://www.instagram.com/kogvetstyret/" target="_blank">
                    <img class="Instagram" src="https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-instagram-icon-instagram-logo-icon-instagram-logo-16.png">
                </a>
            </li>
        </ul>

        <hr class="solid">    

        <h3>Våra Sponsorer</h3>
        <ul>
        <!-- Loopar igenom alla objekt i filen data/sponsorer/panel.json och skapar en länk av den ikonen som lagts till -->
        {#each sponsors as sponsor}
            <li>
                <a href={sponsor.href}>
                    <img class="spons" src={sponsor.img} alt="Sponsor Logga">
                </a>
            </li>
        {/each}
    </ul>
</div>


<style>

    #SponsorCard{
        background-color: white;
        width: 270px;
        height: 300px;
        margin: 0;
        text-align: center;
    }

    .Facebook{
        width : 60%;
    }

    .Instagram{
        width : 60%;
    }

    .solid{
      border-top: 2px solid #bbb;  
    }

    ul {
        list-style: none;
        padding: 0;
        display:flex;
        justify-content: space-between;
    }

    .spons {
        max-width: 100px;
    }
</style>

