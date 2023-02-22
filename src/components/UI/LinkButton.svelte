<script>
    export let size = 20
</script>
<button style={`font-size: ${size}px;`}>
    <slot/>
</button>
<style>
    button {
        font-size: 20px;
        font-family: Adobe Blank;
        font-weight: 400;
        background-color: transparent;
        color: var(--koggis-grön);
        padding: calc(1em * (18 / 20));
        border: none;
        transition: 90ms all ease;
        text-decoration: underline transparent;
    }
    button:hover {
        text-decoration: underline var(--koggis-grön);
    }
</style>