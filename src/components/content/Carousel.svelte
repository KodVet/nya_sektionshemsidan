<script>
    export let imageHeight = 'clamp(150px, 30vw, 500px)'
    export let speed = 1
	import { tweened } from 'svelte/motion';
    import {cubicOut} from 'svelte/easing'
    const scaledSpeed = 1/speed * 40
    let pause = false
    function pauser() {
        pause = !pause
    }
    function stop() {
        pause = true
    }
    function play() {
        pause = false
    }
    let scroll = 1
    let previousScroll = 0
    let touchdelta
    let touchinit
    const tween = tweened(0, { easing: cubicOut})
</script>
<div class="container">
    <div class="images" on:mousedown={pauser}
    on:touchstart={(e)=> {
          touchinit = e.touches[0].clientX;
          console.log("scroll", scroll)}}
    on:touchmove={(e)=> {touchdelta = (touchinit - e.touches[0].clientX) / 50 ;
    tween.set((scroll)); 
    scroll = previousScroll + touchdelta;
    }}
    on:touchend={(e)=>{previousScroll=scroll;}}>
        <div class="wrapper"
        style="--imageHeight: {imageHeight}">
            {#each ['one','two','three'] as index}
                <div class="clone {index}" style="
                animation-duration:{scaledSpeed}s; 
                animation-play-state: {pause ? 'paused' : 'running'}; 
                animation-delay: {$tween - 1000000}s;">
                    <slot />
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .images {
        display: flex;
        overflow: hidden;
        .wrapper {
            padding: 0;
            display: flex;
            transform: translateX(calc(100% - ((100% * 4) / 3)));
            .clone {
                display: flex;
                position: relative;
                :global(img) {
                    height: var(--imageHeight);
                }
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
