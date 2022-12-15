<script>
    import { afterUpdate, beforeUpdate, onMount } from "svelte";
    export let baseUrl;
    export let active;
    import { pages } from '../pageStructure.json'

    // console.log("inuti navbar-komponenten:", baseUrl, pages)

    onMount(() =>{
        console.log("nu är active: ", active)
        console.log("och splittad är den: ", active.split('/'))
        handleScroll()
    });

    beforeUpdate(() => {
        
	    navHeight()
    });

    afterUpdate(() => {
        

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

    function newActive(href) {
        active = href
    }

    function dotWasActive() {
        const activeDot = document.querySelector('.active .dot')
        activeDot.style.transition = "ease-in .2s"
        console.log(activeDot)
        setTimeout(() => {
            activeDot.style.transition = ""
            console.log(activeDot)
        }, 500)
        
    }

    function handleScroll() {
        navHeight();
    }

    function handleNavigation(href) {
        newActive(href);
        // dotWasActive();
        console.log("nu är active: ", active)
        console.log("och splittad är den: ", active.split('/'))
        console.log("och länken: ", href)
        console.log("splittad: ", href.split('/'))
    }

</script>

<svelte:window on:scroll={handleScroll} bind:scrollY={y}/>
<div id="navbarElement" class="container">
<nav bind:this={nav} style="height:{nav_h}">
    <img  id="logo" src={baseUrl + "/images/KogvetHuvet.svg"} alt="det är ju loggan hummer" />
    <ul id="navList">
        {#each pages as { url, btnName, childPages }}
        <li  class="navBtn" id="{btnName}">
            <div  class="ddbutton" class:active={active.split('/')[1] === (baseUrl+url).split('/')[1]}>
            <a tabindex="0" on:click={() => baseUrl+url !== active && handleNavigation(baseUrl + url)} href="{baseUrl + url}">{btnName}</a>
                <div class="wrapper">
                    <div class="dot"></div>
                </div>
                <div class="ddcontent" id={btnName}>
                {#each childPages as { url, btnName }}
                    <a tabindex={'0'} class:active={active.split('/')[2] && (active.split('/')[2] === (baseUrl+url).split('/')[2])} on:click={() => baseUrl+url !== active && handleNavigation(baseUrl + url)} href="{baseUrl + url}">{btnName}</a>
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
            .wrapper {
                z-index: 20;
                width: 100%;
                height: 5px;
                opacity: 100%;
                .dot {
                    position: relative;
                    margin: auto;
                    background: white;
                }
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
    .ddcontent:has(a) {
        /* det som animeras */
        clip-path: inset(60px 0 0px 0);
        transform: translateY(-100%);
        opacity: 0%;
        transition: ease-in-out .4s;
        transition-property: opacity, transform, clip-path, background-color;
    }
    .wrapper .dot {
        transition: all .4s ease-in-out;
        /* det som animeras */
        clip-path: inset(0px 2.5px 0px 2.5px);
        width: 5px;
        height: 3px;
    }
    filter: drop-shadow(0px 110px 10px 10px #888888);
    a:hover {
        color: rgb(152, 152, 152);
    }
    &:hover {
        .wrapper .dot {
        clip-path: inset(0 0 0 0);
        width: 98%;
        transform: translateY(0px);
        height: 2px;
        border-radius: 0px;
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
        a.active {
            color:#ff0000 !important;
        }
        }
        .dot {
        clip-path: inset(0 0 0 0);
        transform: translateY(5px);
        border-radius: 5px;
        width: 6px;
        height: 6px;
        }
    }

}}}




@media (min-width: 577px)
{nav {
    display: flex;
    margin: auto;
    width: 100%; }
}
</style>