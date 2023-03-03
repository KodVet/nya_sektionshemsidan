<script>
    export let size = '20px'
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
    function handleClick() {
        dispatch('click')
    }
</script>
<button style={`font-size: ${size};`} on:click={handleClick}>
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
    @media (pointer: fine) {
        button:hover {
            background-color: hsla(340, 7%, 8%, 0.29);
        }
    }

    button:active {
        background-color: hsla(340, 7%, 8%, 0.473);
    }
</style>