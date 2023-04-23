
<script>
    import './MemberCardCQ.scss'
    import SecondaryButton from '@components/UI/SecondaryButton.svelte'
    import { onMount, afterUpdate } from 'svelte';
    export let medlem = {
        namn: 'Namn',
        post: 'Post',
        post_hel: 'Post',
        kontakt: 'Kontakt',
        bild: '#'
    }
    const {
        namn,
        post_hel,
        post,
        kontakt,
        bild,
    } = medlem
    export let direction = 'right';
    export let size = '1rem'


    let hasContent = true;
    let slot;
    let expanded = false;
    let collapsible;
    let more
    let info
    let button
    let imageWidth
    let infoWidth
    let container
    let parentWidth

    onMount(() => {
        hasContent = Boolean(more.innerText)
        console.log("button", button)
        
    });
    afterUpdate(() => {
        hasContent = Boolean(more?.innerText)
        parentWidth = container?.parentNode.parentNode.clientWidth
        console.log("check", parentWidth, parseInt(size) * 20)
        console.log("rSize", responsiveSize)
    })

    function collapse(){
        if (!expanded){
            collapsible.style.maxHeight = `calc(${collapsible.scrollHeight}px - 1em)`
            collapsible.classList.add('collapsed')
        }
        else {
            collapsible.style.maxHeight = 0
            collapsible.classList.remove('collapsed')
        }
        expanded=!expanded
    };
    let h = 70
    $: breakpoint = imageWidth >= infoWidth
    $: margin = hasContent ? (55 * (parseInt(size) / 20)) : parseInt(size)
    // $: responsiveSize = `calc(${size} - ${0}px)`
    $: responsiveSize = parentWidth <= parseInt(size) * 21 ? `calc(${size} - ${((parseInt(size) * 21) - parentWidth) / 15}px)` : size

</script>


<div class={direction + " container"} 
class:expanded="{expanded}" 
class:breakpoint={breakpoint} 
id={namn} 
style="font-size: {responsiveSize};"
bind:this={container}>
    <div class="main wrapper" >
        <div class="imageWrap" bind:clientWidth={imageWidth}>
            <img src={bild} alt="en fin bild på en person" class="image">
        </div>
        <div class="info" bind:clientWidth={infoWidth}>
            <div class="txt" id="namn" style="margin-bottom: clamp(0px, {margin > 0 ? margin : 0}px, 175px);" bind:clientHeight={h}>
                <p><span class="post"><b>{post_hel ? `${post_hel} - ${post}`: post}</b></span></p>
                <hr class="solid s-kyuocepncruE">
                <p><span><b>Namn:</b></span>
                    <span>&nbsp;</span><span class="namn">{namn}</span></p>
                <p><b>Kontakt:</b> <span class="kontakt"> {kontakt}</span></p>
            </div>
        </div>
        {#if hasContent}
        <div class="btn">
            <SecondaryButton size="calc(1em - 6px)" on:click={collapse} light={direction === 'left'}><b>Mer om posten</b></SecondaryButton>
        </div>
        {/if}
    </div>

    <div class="more wrapper">
        <div bind:this={collapsible} class='content'>
            <hr>
            <div class="more" bind:this={more}>
                <slot></slot>
            </div>
        </div>
    </div>
</div>


<style lang="scss">
hr {
    border-style: solid;
    clip-path: inset(0 1px 0 1px);
}
.container {
    position: relative;
    width: 100%;
    height: fit-content;
    border-radius: 3px;
    clip-path: inset(0 -50px -50px -50px);
    position: relative;
    margin: auto;
}

.container.right {
    flex-direction: row;
    background: white;
    .imageWrap {
        background-color: var(--koggis-grön);
    }
    .btn {
        right: 15px;
    }
}

.container.left {
    color: var(--reflex-vit);
    background: var(--koggis-grön);  /*vinkeln = vinkelkn av 360 - (vinkeln av .right - 45) */
    .main.wrapper {
        flex-direction: row-reverse;
    }
    .txt {
        padding-left: 15px;
    }
    .btn {
        left: 15px;
    }
    .imageWrap {
        background-color: var(--reflex-vit);
    }
}

.main.wrapper {
    display:flex;
    flex-direction: row;
    position: relative;
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    flex-grow: 1;
}


.txt{
    padding-top: 15px;
    word-break: break-word;
    max-width: calc(100% - 15px);
}
.btn {
    position: absolute;
    bottom: 15px;
}
.content{
    /* width:100%; */
    flex-basis: 100%;
    overflow: hidden;
    transition: all ease-in-out .4s;
    margin-inline: 1rem;
    max-height: 0;
    :global(p) {
        margin-top: 2px;
    }
}

.content.collapsed {
    padding-bottom: 1rem;
}

p {
    margin: 1px;
}


img{
    margin: auto;
    border: white 2px;
    // clip-path: circle(calc(82px + (1em / 1))); /*behövs tillfälligt då bilderna är kvadratiska med vit ram runt cirkeln med den faktiska bilden*/
    clip-path: circle(41%);
    height: 12em;
    aspect-ratio: 1;
    object-fit: fill;
}
.imageWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 0, 0);
    clip-path: circle(calc(4.992em));
    // height: calc(200px + 1em);
    // width: calc(200px + 1em);
}

button{
    height: 30px;
    /* border-radius: 100%; */
    /* background-color: transparent;
    color:black;
    border: 2px solid; */
    pointer-events: all;
    
}


// .breakpoint {
//     &.left, &.right {
//         width: calc(270px + 1em);
//         .main.wrapper {
//             flex-direction: column;
//             align-items: center;
//             .info {
//                 padding-bottom: 15px;
//                 flex-direction: column;
//                 justify-content: center;
//             }
//             .btn {
//                 position: relative;
//                 right: unset;
//                 left: unset;
//                 top: unset;
//                 bottom: unset;
//                 padding-top: 15px;
//             }
//             .info {
//                 width: calc(100% - 30px);
//                 .txt {
//                     max-width: unset;
//                     padding-left: 0;
//                     margin: 0 !important;
//                     word-break: keep-all;
//                 }
//             }
//             .imageWrap {
//                 width: 275px;
//                 height: 275px;
//                 clip-path: circle(116px);
//                 img {
//                     width: 275px;
//                     height: 275px;
//                     clip-path: circle(114px);
//                 }
//             }
//         }
//     }
// }
</style>