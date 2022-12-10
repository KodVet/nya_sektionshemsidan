<script>
    import { afterUpdate, beforeUpdate, onMount } from "svelte";
    export let baseUrl;
    export let pages;
    console.log("inuti navbar-komponenten:", baseUrl)
    export let active;


    onMount(() =>{
        console.log("nu skapas jag")
        handleScroll()
    });

    beforeUpdate(() => {
        console.log("nu ska jag uppdatera")
	    navHeight()
    });

    afterUpdate(() => {
        console.log("nu har jag uppdaterat")

    })

    let y;
    let nav;
    let min_h = 60;
    let max_h = 115;
    let max_scroll = 200;
    let nav_h = String(max_h) + "px";
    function navHeight() {
        if(0<=y && max_scroll>=y){
            nav_h = String(max_h - ((max_h-min_h)/max_scroll)*y) + "px"
            console.log("navHeight", nav_h, y, nav.offsetTop)
        }
        else{
            nav_h = String(min_h) + "px"
        }
    }

    function handleScroll() {
        navHeight();
    }

    function handleNavigation() {
        const dots = document.getElementsByClassName("dot")

    }

</script>

<svelte:window on:scroll={handleScroll} bind:scrollY={y}/>
<div id="navbarElement" class="container">
<nav bind:this={nav} style="height:{nav_h}">
    <img  id="logo" src={baseUrl + "/images/KogvetHuvet.svg"} alt="det är ju loggan hummer" />
    <ul id="navList">
        {#each Object.values(pages) as { url, btnName, childPages }}
        <li class="navBtn" id="{btnName}">
            <div  class="ddbutton" class:active={active === (baseUrl + url)}><a on:click={() => active = (baseUrl + url)} href="{baseUrl + url}">{btnName}</a>
                <div class="dot"></div>
                <div class="ddcontent" id={btnName}>
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


<style lang="scss">

/* swup relaterat */
.transition-nav {
	z-index: 5;
	opacity: 1;
	transition: .5s;
}

html.is-animating .transition-nav {
	opacity: 0;
	z-index: 5;
}
nav {
    opacity: 100%;
    position: fixed;
    width: 100%;    
    background-color: var(--koggis-grön);
    display: none;
    justify-content: space-between;
    transition: height 20ms;
    top: 0%;
    z-index: 1;
    
    #logo {
        padding: 15px;
        padding-left: 60px;
    }
    #navList{
        display: flex;
        justify-content: flex-start;
        width: 1100px;
        list-style: none;
        align-items: center;
        padding: 0%;
        height: 100%;
        margin: 0px;

        .navBtn{
        font-size: x-large;
        font: bold;
        height: 100%;
        padding-inline: 30px;
            &:first-child {
                padding-left: 200px;
            }
            .ddbutton {
            transition: all ease-in-out .5s;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            .dot {
                position: relative;
                width: 0;
                height: 5px;
                border-radius: 20px;
                background: white;
                transform: translateY(5px);
                transition: .5s ease-in-out;
                transition-property: width, border-radius;
            }
                & > a {
                text-decoration: none;
                color: var(--reflex-vit);
                transition: color ease-in-out .2s;
                }

                .ddcontent:has(a) {
                    position: absolute;
                    height: 60px;
                    /* pixel-värdet är bredden av scrollbaren */
                    width: calc(100vw - 16px);
                    right: 0;
                    box-shadow: 0px 110px 10px 10px #888888;
                    background-color: var(--reflex-vit);
                    display: flex;
                    justify-content: center;
                    top: 100%;
                    a {
                        color: var(--buckethat-svart);
                        padding: 12px 16px;
                        text-decoration: none;
                    }
                }
                &:has(a) .pad {
                    pointer-events: none;
                    right: 0;
                    width: 100vw;
                    height: 100px;
                    opacity: 0;
                    position: absolute;
                    top: 100%;
                    z-index: -1;
                }
            }
        }
    }
}


    /* Animation och interaktivitet med knapparna och dropdowns */
nav {
#navList {
.navBtn{
    filter: drop-shadow(0px 110px 10px 10px #888888);
    a:hover {
        color: rgb(152, 152, 152);
    }
    &:hover {
        .dot {
        width: 50%;
        height: 5px;
        }
        .ddcontent {
        opacity: 100%;
        pointer-events: all;
        transform: translateY(0%);
        clip-path: inset(0 0 0 0);
        }
        .ddbutton:has(a) .pad {
        pointer-events: all;
        }
    }
    /* Active ddcontent animeras tillbaka när den andra fokuseras */
    &:hover ~ .navBtn .active .ddcontent,
    &:has(~ .navBtn:hover) .active .ddcontent {
        opacity: 0%;
        transform: translateY(-100%);
        clip-path: inset(60px 0 0 0);
    }
    .active {
        .ddcontent:has(a) {
        opacity: 100%;
        background-color: var(--limejuice);
        transform: translateY(0%);
        clip-path: inset(0 0 0 0);
        pointer-events: all;
        }
        .dot {
        width: 5px;
        }
    }
    .ddcontent:has(a) {
        /* det som animeras */
        clip-path: inset(60px 0 0px 0);
        transform: translateY(-100%);
        opacity: 0%;
        transition: ease-in-out .5s;
        transition-property: opacity, transform, clip-path, background-color;
    }
}}}




@media (min-width: 577px)
{nav {
    display: flex;
    margin: auto;
    width: 100%; }
}
</style>