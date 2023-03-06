<script>
    export let size = 20
    import FaFacebookF from 'svelte-icons/fa/FaFacebookF.svelte'
    import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
</script>

<ul class="container socials" style="--fontSize: {size}px">
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

<style lang="scss">
.socials {
    list-style: none;
    padding: 0;
    display:flex;
    flex-wrap: wrap;
    gap: calc(15% + 25px);
    justify-content: center;
    font-size: var(--fontSize);
    li {
        display: flex;
    }
    a {
        display: block;
        margin: auto;
        text-decoration: none;
        filter: drop-shadow(0 0 1.5px black);
        color: black;
        font-size: clamp(16px, var(--fontSize), 46px);
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
</style>