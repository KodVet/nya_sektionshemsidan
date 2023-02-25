<script>
    export let speed = 1
    const scaledSpeed = 1/speed * 40

</script>
<div class="container">
    <div class="images">
        <ol>
            <div class="clone one" style="animation-duration:{scaledSpeed}s;">
                <slot />
            </div>
            <div class="clone two" style="animation-duration:{scaledSpeed}s;">
                <slot />
            </div>
            <div class="clone three" style="animation-duration:{scaledSpeed}s;">
                <slot />
            </div>
        </ol>
    </div>
</div>

<style lang="scss">
    .images {
        display: flex;
        overflow: hidden;
        ol {
            padding: 0;
            display: flex;
            transform: translateX(calc(100% - ((100% * 4) / 3)));
            .clone {
                display: flex;
                position: relative;
            }
            .clone.one {
                // visibility: hidden;
                animation: carousel1 linear infinite;
            }
            .clone.two {
                // visibility: hidden;
                animation: carousel2 linear infinite;
            }
            .clone.three {
                // visibility: hidden;
                animation: carousel3 linear infinite;
            }
        }
    }
    @keyframes carousel1 {
        0% {
            opacity: 1;
            transform: translateX(0%);
        }
        33% {
            opacity: 1;
            transform: translateX(100%);
        }
        34% {
            opacity: 1;
        }
        66% {
            opacity: 1;
            transform: translateX(200%);
        }
        67% {
            opacity: 0;
        }
        100% {
            opacity: 0;
            transform: translateX(0%);
        }
    }
    @keyframes carousel2 {
        0% {
            opacity: 1;
            transform: translateX(0%);
        }
        33% {
            opacity: 1;
            transform: translateX(100%);
        }
        34% {
            opacity: 0;
        }
        66% {
            opacity: 0;
            transform: translateX(-100%);
        }
        67% {
            opacity: 1;
        }
        100% {
            opacity: 1;
            transform: translateX(0%);
        }
    }
    @keyframes carousel3 {
        0% {
            opacity: 0;
            transform: translateX(0%);
        }
        33% {
            opacity: 0;
            transform: translateX(-200%);
        }
        34% {
            opacity: 1;
        }
        66% {
            opacity: 1;
            transform: translateX(-100%);
        }
        99% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateX(0%);
        }
    }
</style>