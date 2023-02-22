<script>
    export let size = 20
</script>
<button style={`font-size: ${size}px;`}>
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