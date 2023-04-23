<script>
    export let size = '20px'
    export let light = false
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
    function handleClick() {
        dispatch('click')
    }
    console.log(light)
</script>
<button style={`font-size: ${size};`} on:click={handleClick} class:light={light}>
    <slot/>
</button>
<style>
    button {
        background-color: transparent;
        color: black;
        padding: calc(1em * (18 / 20));
        border: var(--buckethat-svart) solid 1.5px;
        transition: 90ms all ease;
    }
    button.light {
        color: var(--reflex-vit);
        border: var(--reflex-vit) solid 1.5px;
    }
    @media (pointer: fine) {
        button:hover {
            background-color: hsla(340, 7%, 8%, 0.29);
        }
    }

    button:active {
        background-color: hsla(340, 7%, 8%, 0.473);
    }
</style>