<script>
    export let size = 20
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
    function handleClick() {
        dispatch('click')
    }
</script>
<button style={`font-size: ${size}px;`} on:click={handleClick}>
    <slot/>
</button>
<style>
    button {
        font-size: 20px;
        background-color: var(--koggis-grön);
        color: white;
        padding: calc(1em * (18 / 20));
        border: none;
        transition: 90ms all ease;
    }
    button:hover {
        background-color: #025335;
    }
</style>