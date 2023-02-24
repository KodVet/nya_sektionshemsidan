<script>
    import SponsorCard from "./SponsorCard.svelte";
    export let sponsors = false
</script>

<div class="container">
    <div class="text" style="flex-basis: {sponsors ? '60' : '40'}%;">
        <h1>
            <slot name="header"/>
        </h1>
        <p>
            <slot name="content" />
        </p>
    </div>
    <div class="sponsors" style="background-color: {sponsors ? 'white' : 'lightgrey'}">
        {#if sponsors}
            <aside>
                <SponsorCard/>
            </aside>
        {/if}
    </div>
</div>

<style lang="scss">
    .container {
        position: relative;
        border-radius: 3px;
        width: 100%;
        color: white;
        display: flex;
        justify-content: space-between;
        .text {
            flex-basis: 40%;
            padding: 100px;
            padding-top: 20px;
            padding-bottom: calc(3em + 20px);
            max-width: 110ch;
            padding-left: calc(20vw - 130px);
            background-color: var(--koggis-grön);
        }
        .sponsors {
            flex-basis: 25%;
            background-color: lightgray;
        }
    }

    h1 {
        font-size: 4rem;
    }
    p {
        font-size: 1.5rem;
    }
    @media (max-width: 800px) {
        .container {
            flex-direction: column;
            .text {
                padding-inline: 30px;
            }
        }
    }
</style>