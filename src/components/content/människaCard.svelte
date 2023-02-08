
<script>
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


    let hasContent;
    let slot;
    let expanded = false;
    let collapsible;
    let rootFontSize;
    import { onMount, afterUpdate } from 'svelte';
    
    const getDefaultFontSize = () => {
        const element = document.createElement('div');
        element.style.width = '1rem';
        element.style.display = 'none';
        document.body.append(element);

        const widthMatch = window
            .getComputedStyle(element)
            .getPropertyValue('width')
            .match(/\d+/);

        element.remove();

        if (!widthMatch || widthMatch.length < 1) {
            return null;
        }

        const result = Number(widthMatch[0]);
        return !isNaN(result) ? result : null;
    };


    onMount(() => {
        rootFontSize = getDefaultFontSize()
        hasContent = Boolean(collapsible.innerText)
    });
    afterUpdate(() => {
        hasContent = Boolean(collapsible.innerText)
    })

    function collapse(){
        if (!expanded){
            collapsible.style.maxHeight = String(collapsible.scrollHeight - rootFontSize) + 'px'
            collapsible.classList.add('collapsed')
        }
        else {
            collapsible.style.maxHeight = 0
            collapsible.classList.remove('collapsed')
        }
        expanded=!expanded
    };
    hasContent = true
</script>


<div class={direction + " wrapper"} class:expanded="{expanded}" id={namn}>


    {#if direction === "right"}
    <div class="imageWrap">
        <img src={bild} alt="en fin bild på en person" class="image">
    </div>
    <div class="info">
        <div class="txt" id="namn">
            <p><span><b>{post_hel ? `${post_hel} - ${post}`: post}:</b></span><span>&nbsp;</span><span class="namn">{namn}</span></p> 
            <p><b>Kontakt:</b> <span class="kontakt"> {kontakt}</span></p>
        </div>
        <div class="btn">
            {#if hasContent}
            <button on:click={collapse}>Read more</button>
            {/if}
        </div>
    </div>
    {/if}

    {#if direction === "left"}
    <div class="info">
        <div class="txt" id="namn">
            <p><span><b>{post_hel ? `${post_hel} - ${post}`: post}:</b></span><span>&nbsp;</span><span class="namn">{namn}</span></p> 
            <p><b>Kontakt:</b> <span class="kontakt"> {kontakt}</span></p>
        </div>
        <div class="btn">
            {#if hasContent}
            <button on:click={collapse}>Read more</button>
            {/if}
        </div>
    </div>
    <div class="imageWrap">
        <img src={bild} alt="en fin bild på en person" class="image">
    </div>
    {/if}

    <div bind:this={collapsible} class='content'>
        <slot></slot>
    </div>
</div>


<style lang="scss">
.wrapper {
    width: 100%;
    display: grid;
    /* grid-template-rows: 200px 0px; */
    border-radius: 3px;
    clip-path: inset(0 -50px -50px -50px);
}

.wrapper.right {
    grid-template-columns: 200px auto;
    flex-direction: row;
    background: var(--reflex-vit);
    .imageWrap {
        background-color: var(--koggis-grön);
    }
}

.wrapper.left {
    grid-template-columns: auto 200px;

    flex-direction: row-reverse;
    color: var(--reflex-vit);
    background: var(--koggis-grön);  /*vinkeln = vinkelkn av 360 - (vinkeln av .right - 45) */
    .info {
        padding-left: 15px;
    }
    .btn {
        left: 15px;
    }
    .imageWrap {
        background-color: var(--reflex-vit);
    }
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}


.txt{
    max-width: 90%;
}
.btn {
    position: absolute;
    top: 160px;
    right: 15px;
}
.content{
    /* width:100%; */
    grid-column-start: 1;
    grid-column-end: -1;
    overflow: hidden;
    transition: max-height ease-in-out .4s;
    margin-inline: 1rem;
    max-height: 0;
    margin-top: 0;
}

.content.collapsed {
    margin-bottom: 1rem;
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
}

button{
    height: 30px;
    /* border-radius: 100%; */
    /* background-color: transparent;
    color:black;
    border: 2px solid; */
    pointer-events: all;
    
}
</style>