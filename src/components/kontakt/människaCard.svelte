
<script>
    export let namn;
    export let post;
    export let kontakt;
    export let bild;
    export let direction;
    let expanded = false;
    let collapsible;
    let root;
    let rootFontSize;
    import { onMount } from 'svelte';
    
    
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

    });

    function collapse(){
        if (!expanded){
            collapsible.style.maxHeight = String(collapsible.scrollHeight - rootFontSize) + 'px'
        }
        else {
            collapsible.style.maxHeight = 0
        }
        expanded=!expanded
    };
</script>


<div class={direction + " wrapper"} class:expanded="{expanded}">
    <img src={bild} alt="en fin bild på en person">
    <div class="txt">
    <p><b>{post}:</b> {namn}</p> 
    <p><b>Kontakt:</b> {kontakt}</p>
    </div>
    <button on:click={collapse}>Läs mer</button>
    <div bind:this={collapsible} class='content' >
        <slot></slot>
    </div>
</div>


<style>
.wrapper {
    width: 500px;
    margin-top:40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 35%;
    margin-right: 35%;
    padding: 10px;
    border-radius: 20px;
}
.right{
    flex-direction: row;
    background: linear-gradient(119deg, var(--valla-grön) 0%, var(--ovveblues) 100%);
}

.left{
    flex-direction: row-reverse;
    background: linear-gradient(286deg, var(--kiss-efter-för-mycket-öl-gul), var(--finvins-röd));  /*vinkeln = vinkelkn av 360 - (vinkeln av .right - 45)*/
}

.txt{
    margin:auto;
    max-width: 40%;
}
.content{
    width:100%;
    overflow: hidden;
    transition: ease-in-out .4s;
    max-height: 0;
    margin: .6rem;
    margin-top: 0;
}

p {
    margin: 1px;
}


img{
    width: 200px;
    height: 200px;
    clip-path: circle(90px); /*behövs tillfälligt då bilderna är kvadratiska med vit ram runt cirkeln med den faktiska bilden*/
}

button{
    height: 30px;
    margin:auto;
    margin-bottom:5px;
    border-radius: 100%;
    background-color: transparent;
    color:black;
    border: 2px solid;
    pointer-events: all;
    
}
</style>