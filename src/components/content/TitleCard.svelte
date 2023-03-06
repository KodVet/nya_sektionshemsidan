<script>
    import SponsorCard from "./SponsorCard.svelte";
    export let sponsors = false
    export let split = true
    export let bgColor = 'var(--koggis-grön)'
</script>

<div class="container" class:fuse={!split} style="--bg: {bgColor}">
    <div class="text" style="flex-basis: {sponsors ? '60' : '40'}%;">
        <h1>
            <slot name="header"/>
        </h1>
        <p>
            <slot name="content" />
        </p>
    </div>
    <div class="right-panel" style="background-color: {sponsors ? 'white' : 'lightgrey'}">
        {#if sponsors}
            <aside>
                <SponsorCard/>
            </aside>
        {/if}
        <slot name="right-panel"/>
    </div>
</div>

<style lang="scss">
    .container {
        // overflow-x: hidden;
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
            padding-left: calc(20vw - 130px);
            background-color: var(--bg);
            min-width: 56ch;
        }
        .right-panel {
            flex-basis: 25%;
            background-color: lightgray;
        }
    }

    h1 {
        font-size: 3.7rem;
    }
    p {
        font-size: 1rem;
    }
    .fuse {
        .text {

            flex-grow: 1;
        }
        .right-panel {
            flex-basis: 700px;
            background-color: rgb(255, 255, 255);
            :global(img) {
                display: block;
                width: 700px;
            }
        }
    }
    @media (max-width: 800px) {
        .container {
            flex-direction: column;
            .text {
                padding-inline: 30px;
                min-width: unset;
            }
            :global(.right-panel img) {
                width: 100% !important;
            }
        }
        .right-panel {
            flex-basis: unset !important;
        }
    }
    @media (max-width: 412px) {
        .container {
            h1 {
                font-size: 18vw !important;
            }
        }
    }
</style>