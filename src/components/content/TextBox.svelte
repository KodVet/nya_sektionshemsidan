<div class="container">
    <slot>Default slot?</slot>
</div>

<style lang="scss">
    .container {
        // overflow-x: hidden;
        margin-top: 100px;
        margin-left: 100px;
        position: relative;
        color: white;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        padding: 30% 30%;
        width: 100%;
        height: 100%;
        border: 2px solid var(--fulvins-röd);
        border-radius: 5px;
        background-color: var(--koggis-grön);
        transition: border-color 0.3s, box-shadow 0.3s;
        .text {
            flex-basis: 40%;
            padding-right: 100px;
            padding-top: 20px;
            padding-bottom: calc(3em + 20px);
            padding-left: calc(20vw - 130px);
            background-color: var(--bg);
            p {
                max-height: 9ch;
            }
        }
        .right-panel {
            flex-basis: 25%;
            background-color: lightgray;
        }
    }
</style>