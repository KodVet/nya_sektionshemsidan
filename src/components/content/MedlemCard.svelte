
<script>
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


    let hasContent = true;
    let slot;
    let expanded = false;
    let collapsible;
    let rootFontSize;
    let info
    let button

    onMount(() => {
        hasContent = Boolean(collapsible.innerText)
        console.log("button", button)
    });
    afterUpdate(() => {
        hasContent = Boolean(collapsible.innerText)
        console.log(h)
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
    $: margin = h - 70
</script>


<div class={direction + " container"} class:expanded="{expanded}" id={namn}>
    <div class="main wrapper">
        <div class="imageWrap">
            <img src={bild} alt="en fin bild på en person" class="image">
        </div>
        <div class="info">
            <div class="txt" id="namn" style="margin-bottom: {margin > 0 ? margin : 0}px;" bind:clientHeight={h}>
                <p><span class="post"><b>{post_hel ? `${post_hel} - ${post}`: post}</b></span></p>
                <hr class="solid s-kyuocepncruE">
                <p><span><b>Namn:</b></span>
                    <span>&nbsp;</span><span class="namn">{namn}</span></p>
                <p><b>Kontakt:</b> <span class="kontakt"> {kontakt}</span></p>
            </div>
        </div>
        {#if hasContent}
        <div class="btn">
            <SecondaryButton size={13} on:click={collapse}><b>Read more</b></SecondaryButton>
        </div>
        {/if}
    </div>

    <div class="more wrapper">
        <div bind:this={collapsible} class='content'>
            <slot></slot>
        </div>
    </div>
</div>


<style lang="scss">
.container {
    width: 100%;
    border-radius: 3px;
    clip-path: inset(0 -50px -50px -50px);
    position: relative;
    margin: auto;
}

.container.right {
    flex-direction: row;
    background: var(--reflex-vit);
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
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    flex-grow: 1;
}


.txt{
    max-width: calc(100% - 15px);
}
.btn {
    position: absolute;
    top: 144px;
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
    clip-path: circle(82px); /*behövs tillfälligt då bilderna är kvadratiska med vit ram runt cirkeln med den faktiska bilden*/
    height: 200px;
    width: 200px;
}
.imageWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 0, 0);
    clip-path: circle(84px);
    height: 200px;
    width: 200px;
    flex-basis: 33%;
}

button{
    height: 30px;
    /* border-radius: 100%; */
    /* background-color: transparent;
    color:black;
    border: 2px solid; */
    pointer-events: all;
    
}
@media (max-width: 400px) {
    .container.left, .container.right {
        width: 270px;
        .main.wrapper {
            flex-direction: column;
            align-items: center;
            .info {
                padding-bottom: 15px;
                flex-direction: column;
                justify-content: center;
            }
            .btn {
                position: relative;
                right: unset;
                left: unset;
                top: unset;
                margin-bottom: 15px;
            }
            .info {
                width: calc(100% - 30px);
                .txt {
                    max-width: unset;
                    padding-left: 0;
                    margin: 0 !important;
                }
            }
            .imageWrap {
                width: 275px;
                height: 275px;
                clip-path: circle(116px);
                img {
                    width: 275px;
                    height: 275px;
                    clip-path: circle(114px);
                }
            }
        }
    }
}
</style>