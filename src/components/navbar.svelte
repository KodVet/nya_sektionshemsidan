<script>
    import { afterUpdate, beforeUpdate, onMount } from "svelte";
    export let baseUrl;
    export let pages;
    console.log("inuti navbar-komponenten:", baseUrl)
    export let active;
    let y;
    let nav;

    let min_h = 60;
    let max_h = 115;
    let max_scroll = 200;
    let nav_h = String(max_h) + "px";
    function nav_scroll() {
        if(0<=y && max_scroll>=y){
            nav_h = String(max_h - ((max_h-min_h)/max_scroll)*y) + "px"
            console.log("nav_scroll", nav_h, y, nav.offsetTop)
        }
        else{
            nav_h = String(min_h) + "px"
        }
    }

    onMount(() =>{
        console.log("nu skapas jag")
        scroll_funcs()
    });

    afterUpdate(() => {
        console.log("nu har jag uppdaterat")
    })

    beforeUpdate(() => {
        console.log("nu ska jag uppdatera")
	nav_scroll()
    });


    function scroll_funcs() {
        nav_scroll();
    }

</script>

<svelte:window on:scroll={scroll_funcs} bind:scrollY={y}/>
<div id="navbarElement" class="container">
<nav bind:this={nav} style="height:{nav_h}">
    <img  id="logo" src={baseUrl + "/images/KogvetHuvet.svg"} alt="det är ju loggan hummer" />
    <ul>
        {#each Object.values(pages) as { url, btnName, childPages }}
        <li class="navBtn" id="{btnName}">
            <div  class="ddbutton" class:active={active === (baseUrl + url)}><a on:click={() => active = (baseUrl + url)} href="{baseUrl + url}">{btnName}</a>
                <div class="dot"></div>
                <div class="ddcontent" id="{btnName}" style = "background-color: {active === baseUrl + url ? '#D1F2D5' : '#F3F3F4'};">
                {#each Object.values(childPages) as { url, btnName }}
                    <a href="{baseUrl + url}">{btnName}</a>
                {/each}
                </div>
                <div class="pad"></div>
            </div>
        </li>
        {/each}
    </ul>
</nav>
</div>


<style>
.transition-nav {
	z-index: 5;
	opacity: 1;
	transition: .5s;
}

html.is-animating .transition-nav {
	opacity: 0;
	z-index: 5;
}

    #logo {
        padding: 15px;
        padding-left: 60px;
    }
    li{
        font-size: x-large;
        font: bold;
        height: 100%;
        padding-inline: 30px;
    }
    li:first-child {
        padding-left: 200px;
    }
    .ddbutton > a {
        text-decoration: none;
        color: #F3F3F4;
        transition: all ease-in-out .2s;
    }
    .wrapper {
        position: relative;
        width: 100%;
        height: fit-content;
       
    }
    .wrapper * {
        overflow: visible;
    }

    .underlined{
        text-decoration: underline;
    }

    ul{
        display: flex;
        justify-content: flex-start;
        width: 1100px;
        list-style: none;
        align-items: center;
        padding: 0%;
        height: 100%;
        margin: 0px;
    }

    nav {
        opacity: 100%;
        position: fixed;
        width: 100%;    
        background-color: rgba(3, 125, 79, 1);
        display: none;
        justify-content: space-between;
        transition: height 20ms;
        top: 0%;
        z-index: 1;
    }
    nav > * {
        position: relative;
        opacity: 100%;
    }
    nav * {
    }
    
    /* Animation och interaktivitet med knapparna och dropdowns */
    .ddbutton {
        transition: all ease-in-out .5s;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .navBtn:hover .dot {
        width: 50%;
        height: 5px;
    }
    .navBtn:hover .ddcontent {
        opacity: 100%;
        pointer-events: all;
        transform: translateY(0%);
        clip-path: inset(0 0 0 0);
    }
    .navBtn:hover .pad{
        pointer-events: all;
    }

    /* kankse blir klottrigt?? */
    .ddbutton  > a:hover {
        color: rgb(152, 152, 152);
    }

    .navBtn:hover ~ .navBtn .active .ddcontent,
    .navBtn:has(~ .navBtn:hover) .active .ddcontent {
        opacity: 0%;
        transform: translateY(-100%);
        clip-path: inset(60px 0 0 0);
    }
    .navBtn {
        filter: drop-shadow(0px 110px 10px 10px #888888);
    }

    .active .ddcontent {
        opacity: 100%;
        background-color: aquamarine;
        /* transition: none; */
        transform: translateY(0%);
        clip-path: inset(0 0 0 0);
        pointer-events: all;

    }

    ul .active .dot {
        width: 5px;
    }
    .ddcontent:has(a){
        position: absolute;
        /* pointer-events: none; */
        height: 60px;
        /* pixel-värdet är bredden av scrollbaren */
        width: calc(100vw - 16px);
        right: 0;
        box-shadow: 0px 110px 10px 10px #888888;
        display: flex;
        justify-content: center;
        top: 100%;

        /* animationen */
        clip-path: inset(60px 0 0px 0);
        transform: translateY(-100%);
        opacity: 0%;
        transition: ease-in-out .5s;
        transition-property: opacity, transform, clip-path;
    }
    .ddbutton:has(a) .pad {
        pointer-events: none;
        right: 0;
        width: 100vw;
        height: 100px;
        opacity: 0;
        position: absolute;
        top: 100%;
        /* background-color: black; */
        z-index: -1;
        /* opacity: 10%; */
    }


    .ddcontent > a {
        color: #221E1F;
        padding: 12px 16px;
        text-decoration: none;
}
    .navBtn .dot {
        position: relative;
        width: 0;
        height: 5px;
        border-radius: 20px;
        background: white;
        transform: translateY(5px);
        transition: .5s ease-in-out;
        transition-property: width, border-radius;
    }

    .stickied{
        position: fixed !important;
        top: 0px;
    }



@media (min-width: 577px)
{nav {
    display: flex;
    margin: auto;
    width: 100%; }
}
</style>