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
        font-size: 20px;
        background-color: var(--koggis-grön);
        color: white;
        padding: calc(1em * (18 / 20));
        border: none;
        transition: 90ms background-color ease;
    }
    button:hover {
        background-color: #025335;
    }
</style>